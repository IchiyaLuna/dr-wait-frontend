// utils/refreshLock.ts
let isRefreshing = false;

/**
 * 첫 호출의 결과(성공/실패)를 대기 중인 모든 콜백에게 전달하기 위한 대기 큐
 */
interface Pending<T> {
  resolve: (value: T) => void;
  reject: (error: any) => void;
}
let waitingQueue: Pending<any>[] = [];

/**
 * withRefreshLock(fn):
 * - 최초 한 번만 fn()을 실행
 * - 그 결과(혹은 에러)를 대기 큐에 담긴 모든 대기자들에게 전달
 * - 이후 재진입된 호출자는 “대기 큐에 들어간 후”, 최초 fn() 결과를 그대로 받음
 */
export async function withRefreshLock<T>(fn: () => Promise<T>): Promise<T> {
  // 이미 리프레시 진행 중이라면, 결과(첫 호출이 반환한 값)를 기다리는 프라미스를 리턴
  if (isRefreshing) {
    return new Promise<T>((resolve, reject) => {
      waitingQueue.push({ resolve, reject });
    });
  }

  // 최초 호출 시
  isRefreshing = true;
  try {
    const result = await fn(); // 실제 fetch(`/reissue`) 등

    // 첫 호출이 성공했다면, 모든 대기자에게 결과를 전달
    waitingQueue.forEach(({ resolve }) => {
      resolve(result);
    });
    return result;
  } catch (error) {
    // 첫 호출이 실패했다면, 모든 대기자에게 에러를 전달
    waitingQueue.forEach(({ reject }) => {
      reject(error);
    });
    throw error;
  } finally {
    // 꼭 마지막에 플래그 초기화 & 큐 비우기
    isRefreshing = false;
    waitingQueue = [];
  }
}

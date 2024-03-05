import apiClient from "./api-client";

interface Entity {
    id: number;
}

class HttpsServices {
  endpoint: string;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  add<T>(data: T) {
    return apiClient.post(this.endpoint, data);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch("/users/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpsServices(endpoint);

export default create;

import BaseApi from '../BaseApi';

export class ResourcesApi extends BaseApi {
  constructor() {
    super('/resources');
  }

  getUrlImg(path: string) {
    return `https://ya-praktikum.tech/api/v2/resources${path}`;
  }

  getData(patch: string) {
    return this.http.get(`/${patch}`);
  }

  postData(data: FormData) {
    return this.http.post('', { data });
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new ResourcesApi();

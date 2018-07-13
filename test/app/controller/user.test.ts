import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { isEqual } from 'lodash';

describe('test/app/controller/user.test.ts', () => {
  it('should POST /api/register', async () => {
    const result = await app.httpRequest().post('/api/register', { username: 'guxiang' }).expect(200);
    assert(isEqual(JSON.parse(result.text), { status: 1002, statusInfo: '参数错误' }));
  });

  it('should POST /api/register', async () => {
    const result = await app.httpRequest().post('/api/register', { username: 'guxiang', password: 'guxiang' }).expect(200);
    assert(isEqual(JSON.parse(result.text), { status: 1002, statusInfo: '参数错误' }));
  });

  it('should POST /api/register', async () => {
    const result = await app.httpRequest().post('/api/register', { username: 'guxiang', password: 'Guxiang', headImageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3485395516,1624712668&fm=27&gp=0.jpg' }).expect(200);
    assert(isEqual(JSON.parse(result.text), { status: 1002, statusInfo: '参数错误' }));
  });

  it('should POST /api/error', async () => {
    const result = await app.httpRequest().get('/api/error').expect(200);
    assert(isEqual(JSON.parse(result.text), { status: 1005, statusInfo: '手动错误' }));
  });
});

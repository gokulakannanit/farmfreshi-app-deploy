import { UsernameMaskPipe } from './username-mask.pipe';

describe('UsernameMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new UsernameMaskPipe();
    expect(pipe).toBeTruthy();
  });
});

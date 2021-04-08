import { UserActiveGuard } from './user-active.guard';

describe('UserActiveGuard', () => {
  it('should be defined', () => {
    expect(new UserActiveGuard()).toBeDefined();
  });
});

import { RemoveCartDirective } from './remove-cart.directive';

describe('RemoveCartDirective', () => {
  let dialog: { get: jasmine.Spy };
  let directive;
  beforeEach(() => {
    directive = new RemoveCartDirective(<any>dialog);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

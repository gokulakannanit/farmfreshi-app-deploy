import { RemoveProductFromCartDirective } from './remove-product-from-cart.directive';

describe('RemoveProductFromCartDirective', () => {
  let directive;
  beforeAll(() => {
    let dialog: { get: jasmine.Spy };
    directive = new RemoveProductFromCartDirective(<any>dialog);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

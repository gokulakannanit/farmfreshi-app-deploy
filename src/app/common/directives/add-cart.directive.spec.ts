import { AddCartDirective } from './add-cart.directive';

describe('AddCartDirective', () => {
  let dialog: { get: jasmine.Spy };
  let directive;
  beforeEach(() => {
    directive = new AddCartDirective(<any>dialog);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});

import { VotoClientPage } from './app.po';

describe('voto-client App', () => {
  let page: VotoClientPage;

  beforeEach(() => {
    page = new VotoClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

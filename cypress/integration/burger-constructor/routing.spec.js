describe('service is available', function() {
  before(function() {
    cy.viewport(1655,1080);
    cy.visit('http://localhost:3000');
  });

  it('should be available on localhost:3000', function() {
    cy.viewport(1655,1080)
    cy.visit('http://localhost:3000');
  });

  it('should open route = "/" by default', function() {
    cy.viewport(1655,1080)
    cy.contains("Соберите бургер");
  });

  it('should open route="/feed" by click on "Лента заказов"', function() {
    cy.viewport(1655,1080)
    cy.get("span").contains("Лента заказов").click();
    cy.contains("Лента заказов");
  });

  it('should open route="/login" by click on "Войти"', function() {
    cy.viewport(1655,1080)
    cy.get("span").contains("Войти").click();
    cy.contains("Вход");
  });
});
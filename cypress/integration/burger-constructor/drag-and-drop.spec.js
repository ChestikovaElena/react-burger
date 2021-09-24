describe('drag-and-drop works correctly', function() {
  before(function() {
    cy.viewport(1655,1080)
    cy.visit('http://localhost:3000')
  });

  it('drag-and-drop of the bun in empty constructor works correctly', function() {
    cy.viewport(1655,1080);
    cy.get('ul[class^="burger-ingredients_block_list"] > :nth-child(1) > a > div').first().as('draggedBunIngredient');
    cy.get('section[class^="burger-constructor_column"]').as('dropSection');

    cy.get('@draggedBunIngredient').trigger('dragstart');
    cy.get('@dropSection').trigger('drop');

    let title = null;
    cy.get('@draggedBunIngredient').find('h4').invoke('text')
      .then((text) => { title = text });

    //булка, которую перетащили в начале и конце конструктора  > :nth-child(2) > a > div :nth-child(2)
    cy.get('@dropSection').find('span[class="constructor-element__text"]').first().invoke('text')
      .then((text) => {expect(`${title} (верх)`).to.equal(text)});
    cy.get('@dropSection').find('span[class="constructor-element__text"]').last().invoke('text')
      .then((text) => {expect(`${title} (низ)`).to.equal(text)});

    // отобразилась цифра 2 в счетчике булки
    cy.get('@draggedBunIngredient').find('p[class^="counter_counter__num"]').invoke('text')
    .then((text) => expect("2").to.equal(text));
  });

  it('drag-and-drop of the main in nonempty constructor works correctly', function() {
    cy.viewport(1655,1080);
    cy.get('ul[class^="burger-ingredients_block_list"] > :nth-child(2) > a > div').last().as('draggedMainIngredient');
    cy.get('section[class^="burger-constructor_column"]').as('dropSection');

    cy.get('@draggedMainIngredient').trigger('dragstart');
    cy.get('@dropSection').trigger('drop');

    let title = null;
    cy.get('@draggedMainIngredient').find('h4').invoke('text')
      .then((text) => { title = text });
    
    //мясо, которое перетащили есть в конструкторе в середине
    cy.get('@dropSection').find('span[class="constructor-element__text"]').first().invoke('text')
      .then((text) => {expect(`${title} (верх)`).to.not.equal(text)});
    cy.get('@dropSection').find('ul[class^="burger-constructor_ingredients_list"]')
      .find('span[class="constructor-element__text"]').first().invoke('text')
      .then((text) => {expect(title).to.equal(text)});
    cy.get('@dropSection').find('span[class="constructor-element__text"]').last().invoke('text')
      .then((text) => {expect(`${title} (низ)`).to.not.equal(text)});
    
    // отобразилась цифра 1 в счетчике ингредиента
    cy.get('@draggedMainIngredient').find('p[class^="counter_counter__num"]').invoke('text')
    .then((text) => expect("1").to.equal(text));
  });

  it('drag-and-drop of several main in nonempty constructor works correctly', function() {
    cy.viewport(1655,1080);
    cy.get('ul[class^="burger-ingredients_block_list"] > :nth-child(2) > a > div').last().as('draggedMainIngredient');
    cy.get('section[class^="burger-constructor_column"]').as('dropSection');

    cy.get('@draggedMainIngredient').trigger('dragstart');
    cy.get('@dropSection').trigger('drop');

    // отобразилась цифра 2 в счетчике ингредиента
    cy.get('@draggedMainIngredient').find('p[class^="counter_counter__num"]').invoke('text')
    .then((text) => expect("2").to.equal(text));
  });

})
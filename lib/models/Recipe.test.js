const mongoose = require('mongoose');
const Recipe = require('./Recipe');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [
        { _id: expect.any(mongoose.Types.ObjectId),
          name: 'chocolate chips',
          amount: 1,
          measurement: 'cup'
        }
      ],
    });

    expect(recipe.toJSON()).toEqual({
      name: 'Cookies',
      _id: expect.any(mongoose.Types.ObjectId),
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [
        { _id: expect.any(mongoose.Types.ObjectId),
          name: 'chocolate chips',
          amount: 1,
          measurement: 'cup'
        }
      ]
    });
  });
});

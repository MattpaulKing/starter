import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

const mainMenuItems = [
  {
    label: 'BEEF TENDERLOIN CARPACCIO',
    category: 'starters + shares',
    ingredients:
      'chimichurri aioli, fried capers, arugula, citrus vinaigrette, parmesan, crispy bread',
    price: 22
  },
  {
    label: 'AHI TUNA TATAKI',
    category: 'starters + shares',
    ingredients:
      'mango cucumber salsa, maple ginger soy, wasabi ginger aioli, crushed mesquite potato chips',
    price: 23
  },
  {
    label: 'TRUFFLE FRITES',
    category: 'starters + shares',
    ingredients: 'parmesan, fresh herbs, white truffle oil, roasted garlic aioli',
    price: 14
  },
  {
    label: 'TACOS AL PASTOR',
    category: 'starters + shares',
    ingredients:
      'marinated + grilled pork shoulder, roasted pineapple, pickled onions, avocado lime crema, cilantro, corn tortilla chips, tomato salsa',
    price: 20
  },
  {
    label: 'FLATBREAD',
    category: 'flatbread pizzas',
    ingredients: 'rosemary, parmesan, cracked pepper, gorgonzola cream',
    price: 12
  },
  {
    label: 'FIG + PROSCIUTTO FLATBREAD',
    category: 'flatbread pizzas',
    ingredients:
      'gorgonzola cream, shaved prosciutto, black mission figs, herb ricotta, arugula, honey chili glaze, balsamic reduction',
    price: 22
  },
  {
    label: 'NEW YORK CLASSIC',
    category: 'flatbread pizzas',
    ingredients:
      'pomodoro sauce, mozzarella, double pepperoni, chili flakes, parmesan dust, olive oil',
    price: 20
  },
  {
    label: 'BOURBON BARBECUE RIBS',
    category: 'mains',
    ingredients:
      'potato bacon salad, seasonal vegetables, bourbon barbecue sauce, pineapple salsa',
    price: 34
  },
  {
    label: 'PAN SEARED MISO HALIBUT',
    category: 'mains',
    ingredients:
      'okonomiyaki cabbage cake, kewpie mayo, seasonal vegetables, lemongrass ginger compound butter, micro salad',
    price: 38
  },
  {
    label: 'BLACKENED CREOLE CHICKEN',
    category: 'mains',
    ingredients:
      'roasted skin on breast, garlic whipped potatoes, seasonal vegetables, signature glo butter',
    price: 29
  },
  {
    label: '6OZ NEW YORK STRIPLOIN',
    category: 'chophouse',
    ingredients: '',
    price: 34
  },
  {
    label: '8OZ NEW YORK STRIPLOIN',
    category: 'chophouse',
    ingredients: '',
    price: 40
  },
  {
    label: '7OZ BEEF TENDERLOIN',
    category: 'chophouse',
    ingredients: '',
    price: 45
  }
]

const dessertItems = [
  {
    label: "HONEY LAVENDER CHEESECAKE",
    category: "food",
    ingredients: "blackberry mint compote, citrus lemon curd, whipped cream",
    price: 12
  },
  {
    label: "KEY LIME PIE",
    category: "food",
    ingredients: "graham cracker crust, coconut whipped cream, icing sugar",
    price: 11
  },
  {
    label: "CHOCOLATE COCONUT TORTE",
    category: "food",
    ingredients: "chocolate sauce, whipped cream, gooseberry, icing sugar",
    price: 12
  },
  {
    label: "STICKY TOFFEE PUDDING",
    category: "food",
    ingredients: "warm date + ginger cake, rum caramel sauce, vanilla bean ice cream, gooseberry",
    price: 11
  },
  {
    label: "baileys coffee",
    category: "drinks",
    ingredients: "baileys, coffee, whipped cream",
    price: 9
  },
  {
    label: "blueberry tea",
    category: "drinks",
    ingredients: "grand marnier, amaretto, steeped orange pekoe tea, cinnamon",
    price: 9
  },
  {
    label: "spanish coffee",
    category: "drinks",
    ingredients: "kahlua, brandy, coffee, whipped cream",
    price: 9
  },
  {
    label: "espresso martini",
    category: "drinks",
    ingredients: "van gogh espresso vodka, crème de cacao, baileys, cold brew espresso, chocolate bitters",
    price: 13
  }
]

const drinkItems = [
  {
    label: "HOT TROPICS MARGARITA",
    category: "cocktails - 2oz",
    ingredients: "el tequileno silver tequila, quadruple sec, mango, pineapple, agave, lime, chili, tajin",
    price: 14
  },
  {
    label: "BLACK RASPBERRY SOUR",
    category: "cocktails - 2oz",
    ingredients: "amaretto, chambord, vanilla vodka, citrus, vanilla extract, foamer, purple beet dust",
    price: 13
  },
  {
    label: "EARL GREY MARTINI",
    category: "cocktails - 2oz",
    ingredients: "earl grey infused hendricks gin, citrus, foamer, angostura bitters, lavender mist",
    price: 14
  },
  {
    label: "HIBISCUS LEMONADE",
    category: "cocktails - 2oz",
    ingredients: "tanqueray rangpur gin, house made hibiscus tea syrup, lemonade",
    price: 13
  },
  {
    label: "peach mojito",
    category: "cocktails - 2oz",
    ingredients: "captain morgan’s spiced rum, peach schnapps, peach puree, simple syrup, sparkling water, muddled mint, limes + peaches",
    price: 13
  },
  {
    label: "signature caesar",
    category: "classics",
    ingredients: "smirnoff vodka, motts clamato, worcestershire, tabasco, signature seasoning, spicy beans + fresh cracked pepper",
    price: 13
  },
  {
    label: "NEGRONI",
    category: "classics",
    ingredients: "tanqueray gin, campari, sweet vermouth, orange",
    price: 14
  },
  {
    label: "whiskey sour",
    category: "classics",
    ingredients: "bulleit bourbon, lemon, simple syrup, foamer, bitters",
    price: 14
  },
  {
    label: "peroni",
    category: "beer",
    ingredients: "5%",
    price: 8
  },
  {
    label: "philips blue buck",
    category: "beer",
    ingredients: "5%",
    price: 8
  },
  {
    label: "hoyne pilsner",
    category: "beer",
    ingredients: "5.3%",
    price: 8
  },
  {
    label: "driftwood fat tug",
    category: "beer",
    ingredients: "7%",
    price: 8
  }
]

function getMenuItems(selectedMenu: string) {
  switch (selectedMenu) {
    case "main":
      return {
        sections: Array.from(new Set(mainMenuItems.map(({ category }) => category))),
        items: mainMenuItems
      }
    case "dessert":
      return {
        sections: Array.from(new Set(dessertItems.map(({ category }) => category))),
        items: dessertItems
      }
    case "drinks":
      return {
        sections: Array.from(new Set(drinkItems.map(({ category }) => category))),
        items: drinkItems,
      }
    default:
      error(404)
  }
}

export const load: PageServerLoad = async ({ params: { menuSection }, locals: { db } }) => {
  return {
    selectedMenu: menuSection,
    menu: getMenuItems(menuSection)
  }
}

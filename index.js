let store = {  neighborhoods: [],meals: [], customers: [], deliveries: []};
let neighborhoodId= 0
let customerId= 0
let mealId= 0
let deliveryId= 0


class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter(el => el.neighborhoodId === this.id)
  }
  customers() {
    return store.customers.filter(el => el.neighborhoodId === this.id)
  }
  meals() {
    const total = this.deliveries().map(el => el.meal())
    return Array.from(new Set(total))
  }
}
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
  deliveries() {
    return store.deliveries.filter(el => el.mealId === this.id)
  }
  customers() {
    return this.deliveries().map(el => el.customer())
  }
  static byPrice() {
    return store.meals.sort((el1, el2) => el1.price < el2.price)
  }
}
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId
    store.customers.push(this)
  }
  deliveries() {
    return store.deliveries.filter(el => el.customerId === this.id)
  }
  meals() {
    return this.deliveries().map(el => el.meal())
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);

  }
}
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find(el => el.id === this.mealId)
  }
  customer() {
    return store.customers.find(el => el.id === this.customerId)
  }
  neighborhood() {
    return store.neighborhoods.find(el => el.id === this.neighborhoodId)
  }
}

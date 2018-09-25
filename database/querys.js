export const getById = (Model, id) => {
  if(Model) {
    return Model.find({ _id: id }).sort('-time').limit(1).exec()
  } else {
    throw "Incorrect params"
  }
}

const { Category } = require("../DB/Category");

class CategoryService {
  async addCategory(title) {
    let category = new Category();
    if (await this.findCategory(title)) return { message: "Category already exist!" ,success:false};
    const data = { title: title };
    await category.insertOne(data);
    return { message: "Category created!" ,success:true};
  }
  async updateCategory(title, dataObj) {
    let category = new Category();
    if (!this.findCategory(title))
      return { message: "Category doesnot exist!" ,success:false};
    const id = await this.findCategory(title).then((c) => c._id);
    await category.updateOne(id, dataObj);
    return { message: "Category updated!" ,success:true};
  }
  async deleteCategory(title) {
    let category = new Category();
    if (!(await this.findCategory(title)))
      return { message: "Category doesnot exist!" ,success:false};
    const id = await this.findCategory(title).then((c) => c._id);
    await category.deleteOne(id);
    return { message: "Category deleted!" ,success:true};
  }
  async listAll(){
    let category = new Category();
    return (await category.findAll())
  }
  async findCategory(title) {
    let category = new Category();
    return (await category.findOne({ title: title }));
  }
}

module.exports = { CategoryService };

import ApiError from "../error-handling/api.error";
import CompanyModel from "../model/company.model";

class companiesService {
  async createCompany(companyName, accountantId) {
    const companyNameValidate = await CompanyModel.findOne({
      name: companyName,
    });
    if (companyNameValidate) {
      throw ApiError.Conflict(`Компания ${companyName} уже существует`);
    }
    const newCompany = await CompanyModel.create({
      userId: accountantId,
      name: companyName,
    });
    if (!newCompany) {
      throw ApiError.NotImplemented("Ошибка добавления компании");
    }

    return { id: newCompany.id, name: newCompany.name };
  }

  async allCompanies() {
    const companies = await CompanyModel.find({}, { name: true }).sort({
      name: 1,
    });
    return companies;
  }
  async userCompanies(userId, reception) {
    if (!reception) {
      throw ApiError.BadRequest("Отсутслвует обязателный параметр");
    }
    let companies;
    if (reception === "currentuser") {
      companies = await CompanyModel.find({ userId }, { name: true }).sort({
        name: 1,
      });
    } else {
      companies = await CompanyModel.find(
        { userId: reception },
        { name: true }
      ).sort({
        name: 1,
      });
    }
    return companies;
  }

  async changeAccounter(companyName, userId) {
    const company = await CompanyModel.findOne({ name: companyName });
    company.userId = userId;
    await company.save();
    return company;
  }
}

export default new companiesService();

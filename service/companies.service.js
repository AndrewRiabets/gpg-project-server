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
    console.log("hello service");
    const companies = await CompanyModel.find({}, { name: true }).sort({
      name: 1,
    });
    console.log(companies);
    return companies;
  }
}

export default new companiesService();

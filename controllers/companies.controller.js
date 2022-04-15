import companiesService from "../service/companies.service";

class CompanyController {
  async createCompany(req, res) {
    const { name, UserId } = req.body;
    const companyData = await companiesService.createCompany(name, UserId);
    return res.status(201).json(companyData);
  }
  async getCompanies(req, res) {
    console.log("hello controller");
    const allCompanies = await companiesService.allCompanies(req.query);
    return res.status(201).json(allCompanies);
  }
}

export default new CompanyController();

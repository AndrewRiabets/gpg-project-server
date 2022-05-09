import companiesService from "../service/companies.service";

class CompanyController {
  async createCompany(req, res) {
    const { name, userId } = req.body;
    const companyData = await companiesService.createCompany(name, userId);
    return res.status(201).json(companyData);
  }
  async getCompanies(req, res) {
    const allCompanies = await companiesService.allCompanies(req.query);
    return res.status(201).json(allCompanies);
  }
  async getUserCompanies(req, res) {
    const reception = req.query.reception;
    const userCompanies = await companiesService.userCompanies(
      req.user,
      reception
    );
    return res.status(201).json(userCompanies);
  }
  async changeAccounter(req, res) {
    const { companyName, userId } = req.body;
    const userCompanies = await companiesService.changeAccounter(
      companyName,
      userId
    );
    return res.status(201).json(userCompanies);
  }
}

export default new CompanyController();

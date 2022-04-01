import companiesService from "../service/companies.service";

const getCompanies = async (req, res, next) => {
  console.log(req.user)
  const companies = await companiesService.listCompmanies(req.user, req.query);
  res.status(200).json(companies);
};

const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const company = await companiesService.getCompanyById(req.user, id);
  if (company) {
    res.status(200).json(company);
  }
};

const addCompany = async (req, res, next) => {
  console.log(req.body);
  const newCompany = await companiesService.addCompany(req.user, req.body);
  res.status(201).json(newCompany);
};

const removeCompany = async (req, res, next) => {
  const id = req.params;
  const company = await companiesService.removeCompany(req.user, id, req.body);
  if (company) {
    return res.status(200).json({ company });
  }
  res.status(404).json({ message: "Company not found" });
};

const updateCompany = async (req, res, next) => {
  console.log(req.params)
  const {id} = req.params;
  const company = await companiesService.updateCompany(req.user, id, req.body);
  console.log(company);
  if (company) {
    return res.status(200).json(company);
  }
  res.status(404).json({ message: "Company not found" });
};

export {
  getCompanies,
  getCompanyById,
  addCompany,
  removeCompany,
  updateCompany,
};

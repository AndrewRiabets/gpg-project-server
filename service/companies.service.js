import CompanyModel from "../model/company.model";

const listCompmanies = async (userId) => {
  console.log(userId)
  const result = await CompanyModel.find({owner: userId}).sort({name: 1});
  return result;
};

const getCompanyById = async (userId, companyId) => {
  const result = await CompanyModel.findOne({id: companyId, owner: userId});
  return result;
};

const removeCompany = async (userId, companyId) => {
  const result = await CompanyModel.findOneAndRemove({id: companyId, owner: userId});
  return result;
};

const addCompany = async (userId, body) => {
  console.log(`Сервис ${body}`);
  const result = await CompanyModel.create({...body, owner: userId});
  return result;
};

const updateCompany = async (userId, companyId, body) => {
  const result = await CompanyModel.findOneAndUpdate(
    {id: companyId, owner: userId},
    {...body},
    { new: true }
    );
    console.log(result)
  return result;
};

export default {
  listCompmanies,
  getCompanyById,
  removeCompany,
  addCompany,
  updateCompany,
};

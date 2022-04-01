import ReportModel from "../model/report.model";

const listReports = async () => {
  const result = await ReportModel.find();
  return result;
};

const getReportById = async (reportId) => {
  const result = await ReportModel.findById(reportId);
  return result;
};

const removeReport = async (reportId) => {
  const result = await ReportModel.findByIdAndRemove(reportId);
  return result;
};

const addReport = async (body) => {
  const result = await ReportModel.create(body);
  return result;
};

const updateReport = async (reportId, body) => {
  const result = await ReportModel.findByIdAndUpdate(
    reportId,
    { ...body },
    { new: true }
  );
  return result;
};

export default {
  listReports,
  getReportById,
  removeReport,
  addReport,
  updateReport,
};

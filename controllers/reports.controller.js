import reportsService from "../service/report.service";

const getReports = async (req, res, next) => {
  const reports = await reportsService.listReports(req.query);
  res.status(200).json(reports);
};

const getReportById = async (req, res, next) => {
  const { id } = req.params;
  const report = await reportsService.getReportById(id);
  if (report) {
    res.status(200).json(report);
  }
};

const addReport = async (req, res, next) => {
  const newReport = await reportsService.addReport(req.body);
  res.status(201).json(newReport);
};

const removeReport = async (req, res, next) => {
  const id = req.params;
  const report = await reportsService.removeReport(id, req.body);
  if (report) {
    return res.status(200).json({ report });
  }
  res.status(404).json({ message: "Report not found" });
};

const updateReport = async (req, res, next) => {
  const id = req.params;
  const report = await reportsService.updateReport(id, req.body);
  if (report) {
    return res.status(200).json(report);
  }
  res.status(404).json({ message: "Company not found" });
};

export { getReports, getReportById, addReport, removeReport, updateReport };

import reportsService from "../service/report.service";

class ReportsController {
  async createReport(req, res) {
    const reportData = await reportsService.createReport(req.body);
    return res.status(201).json(reportData);
  }
  async getCompanyReports(req, res) {
    const reception = req.query.reception;
    const allCompanyReports = await reportsService.allCompanyReports(reception);
    return res.status(201).json(allCompanyReports);
  }
  async getCompanyReport(req, res) {
    const reception = req.query.reception;
    const companyReport = await reportsService.getCompanyReportById(reception);
    return res.status(201).json(companyReport);
  }
  async updateReport(req, res) {
    const companyReport = await reportsService.updateReport(req.body);
    return res.status(201).json(companyReport);
  }
}

export default new ReportsController();

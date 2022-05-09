import ApiError from "../error-handling/api.error";
import ReportModel from "../model/report.model";
import CompanyModel from "../model/company.model";

class reportsService {
  async createReport(data) {
    const {
      nameCompany,
      month,
      taxSystem,
      emplBeginMonth,
      emplEndMonth,
      firstSalaryDay,
      secondSalaryDay,
      firstHalfStatement,
      secondHalfStatement,
      primaryDocCompleted,
      firstHalfToRegVAT,
      firstHalfRegistratedVAT,
      secHalfToRegVAT,
      secHalfRegistratedVAT,
      paidSalaryFirstHalf,
      createdPayFirstHalf,
      paidSalarySecondtHalf,
      createdPaySecondtHalf,
      newReportInfo,
      newTaxInfo,
      closeMonth1c,
      finaceResult,
      amountPaymentOrders,
    } = data;
    const { id } = await CompanyModel.findOne({
      name: nameCompany,
    });
    const newReportValidate = await ReportModel.findOne({
      companyId: id,
      date: month,
    });
    if (newReportValidate) {
      throw ApiError.Conflict(`Отчет за ${month} уже существует`);
    }
    const newReport = await ReportModel.create({
      companyId: id,
      nameCompany,
      date: month,
      taxSystem,
      emplBeginMonth,
      emplEndMonth,
      firstSalaryDay,
      secondSalaryDay,
      firstHalfStatement,
      secondHalfStatement,
      primaryDocCompleted,
      firstHalfToRegVAT,
      firstHalfRegistratedVAT,
      secHalfToRegVAT,
      secHalfRegistratedVAT,
      paidSalaryFirstHalf,
      createdPayFirstHalf,
      paidSalarySecondtHalf,
      createdPaySecondtHalf,
      newReportInfo,
      newTaxInfo,
      closeMonth1c,
      finaceResult,
      amountPaymentOrders,
    });
    return { id: newReport.id, date: newReport.date };
  }

  async allCompanyReports(reception) {
    if (!reception) {
      throw ApiError.BadRequest("Отсутслвует обязателный параметр");
    }
    const { id } = await CompanyModel.findOne({ name: reception });
    const reports = await ReportModel.find(
      { companyId: id },
      { date: true }
    ).sort({
      date: -1,
    });

    return reports;
  }

  async getCompanyReportById(reception) {
    if (!reception) {
      throw ApiError.BadRequest("Отсутслвует обязателный параметр");
    }
    const report = await ReportModel.findOne({ _id: reception });
    return report;
  }

  async updateReport(data) {
    const {
      reportId,
      month,
      taxSystem,
      emplBeginMonth,
      emplEndMonth,
      firstSalaryDay,
      secondSalaryDay,
      firstHalfStatement,
      secondHalfStatement,
      primaryDocCompleted,
      firstHalfToRegVAT,
      firstHalfRegistratedVAT,
      secHalfToRegVAT,
      secHalfRegistratedVAT,
      paidSalaryFirstHalf,
      createdPayFirstHalf,
      paidSalarySecondtHalf,
      createdPaySecondtHalf,
      newTaxInfo,
      newReportInfo,
      closeMonth1c,
      finaceResult,
      amountPaymentOrders,
    } = data;

    const report = await ReportModel.findOne({ _id: reportId });
    if (!report) {
      throw ApiError.BadRequest("Не веный ID отчета");
    }
    const updateReportDateValidate = await ReportModel.findOne({
      nameCompany: report.nameCompany,
      date: month,
    });
    if (updateReportDateValidate.date.toString() != report.date.toString()) {
      throw ApiError.Conflict(`Отчет за ${month} уже существует`);
    }
    const updatedReport = await ReportModel.findOneAndUpdate(
      { _id: reportId },
      {
        date: month,
        taxSystem,
        emplBeginMonth,
        emplEndMonth,
        firstSalaryDay,
        secondSalaryDay,
        firstHalfStatement,
        secondHalfStatement,
        primaryDocCompleted,
        firstHalfToRegVAT,
        firstHalfRegistratedVAT,
        secHalfToRegVAT,
        secHalfRegistratedVAT,
        paidSalaryFirstHalf,
        createdPayFirstHalf,
        paidSalarySecondtHalf,
        createdPaySecondtHalf,
        newTaxInfo,
        newReportInfo,
        closeMonth1c,
        finaceResult,
        amountPaymentOrders,
      },
      { new: true }
    );
    console.log(updatedReport);
    return updatedReport;
  }
}

export default new reportsService();

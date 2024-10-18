export const getReportByCompany = async function (company: string, aggregateBy: string) {
  const response = await fetch(`http://localhost:3000/reports/?organization=${company}&aggregateBy=${aggregateBy}`);
  const result = await response.json();
  return result;
};

export default getReportByCompany;

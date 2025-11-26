import anc from "../anc/list";
import pnc from "../pnc/list";
import immun from "../immunization/list";
import tb from "../tb/list";
import ncd from "../ncd/list";

export default async function handler(req, res) {
  // Call each mock API handler manually
  let ancData = [];
  let pncData = [];
  let immunData = [];
  let tbData = [];
  let ncdData = [];

  // Helper to run internal API
  function runInternal(handlerFn) {
    return new Promise((resolve) => {
      handlerFn(
        {}, 
        { status: () => ({ json: (d) => resolve(d) }) }
      );
    });
  }

  ancData = await runInternal(anc);
  pncData = await runInternal(pnc);
  immunData = await runInternal(immun);
  tbData = await runInternal(tb);
  ncdData = await runInternal(ncd);

  // Categories mapping
  const highRiskCases = [];

  ancData
    .filter((x) => x.status === "high-risk")
    .forEach((x) =>
      highRiskCases.push({ ...x, category: "ANC", link: `/dashboard/anc/${x.id}` })
    );

  pncData
    .filter((x) => x.status === "danger")
    .forEach((x) =>
      highRiskCases.push({ ...x, category: "PNC", link: `/dashboard/pnc/${x.id}` })
    );

  immunData
    .filter((x) => x.status === "high-risk")
    .forEach((x) =>
      highRiskCases.push({
        ...x,
        category: "Immunization",
        link: `/dashboard/immunization/${x.id}`,
      })
    );

  tbData
    .filter((x) => x.status === "high-risk")
    .forEach((x) =>
      highRiskCases.push({ ...x, category: "TB", link: `/dashboard/tb/${x.id}` })
    );

  ncdData
    .filter((x) => x.status === "high-risk")
    .forEach((x) =>
      highRiskCases.push({ ...x, category: "NCD", link: `/dashboard/ncd/${x.id}` })
    );

  res.status(200).json(highRiskCases);
}

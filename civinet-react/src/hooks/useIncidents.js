import { useState } from 'react';

// Mock data from original app.js
const initialReportsData = [
  {
    id: 1,
    title: "Vandalism at the park",
    status: "solved",
    reportedDate: "2023-09-15",
    description: "Graffiti and vandalism found at Central Park playground area",
    location: "Central Park, San Francisco",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FtOjxyarrQ_2eDoZ262JchQlURpyIQPCIki9FZpcPaON05XCGo3nj43HHyGppWvbSD_fNHaIKA-MTfOa4UFq5NieHkpBUxfPmDgJdKLUGv8PsN6x32tlQGUCOig74bssIN5VdsC049px8Fk1kgEDRIvJcCSSTw5D4iGz1ANx6sdcYm2RovPkFLJ7xgTx8Zj9D5q7zG3ghYStG-HeWsLSIL47jLJ2vuOinM__TIK3QToiBCa1B0wAcyz0YMy1SmcDPJJPjOVJrriq",
    priority: "medium"
  },
  {
    id: 2,
    title: "Noise complaint",
    status: "pending",
    reportedDate: "2023-09-10",
    description: "Excessive noise from construction site during night hours",
    location: "Mission District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDhw3IGs5WT7wB0oyJl1JPiCcQlz5pn-SefZHAj1Ed-nBwpIqE2KjDwJMcUyOvuVvZZarhwjGRRHuHGhZEINzFWcvCyATaL_QEKRsCdh75xplYFkUO5EomlqFvscv2BBnSLpG8nqjMcctinu9EQlb8ijENIggyR2Ago5rz0sNkW5dN8BAN7VAU-jyThDUkqVxkwMQ4uMtFw1iGTOz2tplXxCYdUl7uc5e5c1lTTbOo4QumgfX_ib2Q8dF5n0xHFOWPuE_suRbAhfxl",
    priority: "high"
  },
  {
    id: 3,
    title: "Illegal parking",
    status: "solved",
    reportedDate: "2023-09-05",
    description: "Vehicle blocking fire hydrant access",
    location: "Market Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBknzdglaiXvkJ_rQJ1gNgzzMwEjojlLQpKz3xd1khM7EnGCVEz5BYgHozheQJraWgind9dXMGK84gJdzfefjvyERM0b1N_qQqBzY31KsoC5bsQt-N8iey609ERNT9k8F556igvwitEBQOvWO6LTgITn_f7IXhIPBLpzZQilSMcTKVxLIfOeP9AiefwMGmLbFPNAhnXLGF8dbd8ynTaFh0CBJfvtt8SuYc2iCmkbN-K7JGZdXOgwYaoTvLxP88KgT1xOZXuDTX7l9O9",
    priority: "medium"
  },
  {
    id: 4,
    title: "Pothole on Main Street",
    status: "in-progress",
    reportedDate: "2023-09-20",
    description: "Large pothole causing damage to vehicles",
    location: "Main Street & Oak Avenue",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5WL8lkWbdhhOiS8GhmLv02f2bpXbFyjNUeGJ0wKlAya3_icRxru-HzUWT_aoss73vO3-PDlYCQlfQL0iiX6gES_UXnpwopMF3UeLYgT4M-hkBBH-XNzCpYS5hcMkBIF0pA_6H7Fmc657fetluCMezqRfQMFqa6mO1cSCOr3ETyo13CIc637_R6JrerFBpoFhnNnGwML5iqThD-km0GL4jtqFtSo2FQF3XYvr6dgsu-jETb2wVtoy3BKiHy-WFKHZRZ8vhyURaHg",
    priority: "high"
  },
  {
    id: 5,
    title: "Broken street light",
    status: "pending",
    reportedDate: "2023-09-18",
    description: "Street light not functioning, creating safety hazard",
    location: "Valencia Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfvvYT6h115b_smaVpnZNVsOx4YqH02D_ymlmvNZMVX6c02u5eY80Qc6DcvQaKtms7lyYGFAwUSzdNV0RXpg82R_yNOA8NsTfx_8C9EzxWIN5UMlBvhj74XysMfeaJhv86RhWJbg45801IVPj3ivfCoioC3XfQQqVNScMuKOokJrLaDaSxbySZqPgseziWbuJz0C-99JiHpP1AjThcRzqRkM1fG8TvL4vqshTLTY7wPS7SPuYF7wThpqWlhUN4gFWN-N8w97-y8Q",
    priority: "medium"
  },
  {
    id: 6,
    title: "Trash accumulation",
    status: "in-progress",
    reportedDate: "2023-09-22",
    description: "Uncollected trash bins for over a week",
    location: "Castro District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0FtOjxyarrQ_2eDoZ262JchQlURpyIQPCIki9FZpcPaON05XCGo3nj43HHyGppWvbSD_fNHaIKA-MTfOa4UFq5NieHkpBUxfPmDgJdKLUGv8PsN6x32tlQGUCOig74bssIN5VdsC049px8Fk1kgEDRIvJcCSSTw5D4iGz1ANx6sdcYm2RovPkFLJ7xgTx8Zj9D5q7zG3ghYStG-HeWsLSIL47jLJ2vuOinM__TIK3QToiBCa1B0wAcyz0YMy1SmcDPJJPjOVJrriq",
    priority: "low"
  },
  {
    id: 7,
    title: "Damaged sidewalk",
    status: "solved",
    reportedDate: "2023-09-12",
    description: "Cracked and uneven sidewalk causing tripping hazard",
    location: "Haight Street",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBknzdglaiXvkJ_rQJ1gNgzzMwEjojlLQpKz3xd1khM7EnGCVEz5BYgHozheQJraWgind9dXMGK84gJdzfefjvyERM0b1N_qQqBzY31KsoC5bsQt-N8iey609ERNT9k8F556igvwitEBQOvWO6LTgITn_f7IXhIPBLpzZQilSMcTKVxLIfOeP9AiefwMGmLbFPNAhnXLGF8dbd8ynTaFh0CBJfvtt8SuYc2iCmkbN-K7JGZdXOgwYaoTvLxP88KgT1xOZXuDTX7l9O9",
    priority: "medium"
  },
  {
    id: 8,
    title: "Abandoned vehicle",
    status: "pending",
    reportedDate: "2023-09-24",
    description: "Car abandoned on residential street for 3 weeks",
    location: "Richmond District",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDhw3IGs5WT7wB0oyJl1JPiCcQlz5pn-SefZHAj1Ed-nBwpIqE2KjDwJMcUyOvuVvZZarhwjGRRHuHGhZEINzFWcvCyATaL_QEKRsCdh75xplYFkUO5EomlqFvscv2BBnSLpG8nqjMcctinu9EQlb8ijENIggyR2Ago5rz0sNkW5dN8BAN7VAU-jyThDUkqVxkwMQ4uMtFw1iGTOz2tplXxCYdUl7uc5e5c1lTTbOo4QumgfX_ib2Q8dF5n0xHFOWPuE_suRbAhfxl",
    priority: "low"
  }
];

export const useIncidents = () => {
  const [reports, setReports] = useState(initialReportsData);

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: reports.length + 1,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setReports([...reports, newReport]);
    return newReport;
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const filterReports = (status) => {
    if (status === 'all') return reports;
    if (status === 'reported') return reports.filter(r => r.status === 'pending' || r.status === 'in-progress');
    return reports.filter(r => r.status === status);
  };

  const getStats = () => {
    const total = reports.length;
    const solved = reports.filter(r => r.status === 'solved').length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const inProgress = reports.filter(r => r.status === 'in-progress').length;
    
    return {
      total,
      solved,
      pending,
      inProgress,
      solvedPercentage: Math.round((solved / total) * 100)
    };
  };

  return {
    reports,
    addReport,
    deleteReport,
    filterReports,
    getStats
  };
};

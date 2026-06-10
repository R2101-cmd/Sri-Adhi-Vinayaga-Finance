import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import AnimatedPage from '../components/AnimatedPage.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const fieldClass = 'focus-ring w-full rounded-md border border-emeraldDeep/14 bg-white px-4 py-3 text-charcoal';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function EMICalculator() {
  const [vehicleCost, setVehicleCost] = useState(850000);
  const [downPayment, setDownPayment] = useState(150000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(48);

  const result = useMemo(() => {
    const principal = Math.max(vehicleCost - downPayment, 0);
    const monthlyRate = interestRate / 12 / 100;
    const emi =
      monthlyRate === 0
        ? principal / Math.max(tenure, 1)
        : (principal * monthlyRate * (1 + monthlyRate) ** tenure) / ((1 + monthlyRate) ** tenure - 1);
    const totalPayable = emi * tenure;
    const totalInterest = totalPayable - principal;
    return { principal, emi, totalPayable, totalInterest };
  }, [vehicleCost, downPayment, interestRate, tenure]);

  const chartData = [
    { name: 'Principal', value: Math.round(result.principal), color: '#0F4C45' },
    { name: 'Interest', value: Math.max(Math.round(result.totalInterest), 0), color: '#D4AF37' },
  ];

  return (
    <AnimatedPage>
      <section className="section-pad bg-mist">
        <div className="container-max">
          <SectionHeading
            eyebrow="EMI Calculator"
            title="Plan your vehicle finance before you apply"
            text="Estimate monthly EMI, total interest, and total payable amount based on vehicle cost, down payment, interest rate, and loan tenure."
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg bg-white p-6 shadow-premium">
              <div className="grid gap-5">
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Vehicle Cost
                  <input className={fieldClass} type="number" value={vehicleCost} onChange={(event) => setVehicleCost(Number(event.target.value))} />
                </label>
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Down Payment
                  <input className={fieldClass} type="number" value={downPayment} onChange={(event) => setDownPayment(Number(event.target.value))} />
                </label>
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Interest Rate (%)
                  <input className={fieldClass} type="number" step="0.1" value={interestRate} onChange={(event) => setInterestRate(Number(event.target.value))} />
                </label>
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Loan Tenure (Months)
                  <input className={fieldClass} type="number" value={tenure} onChange={(event) => setTenure(Number(event.target.value))} />
                </label>
              </div>
            </div>

            <div className="rounded-lg border border-emeraldDeep/10 bg-white p-6 shadow-premium">
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-md bg-emeraldDeep p-5 text-ivory">
                  <p className="text-sm uppercase tracking-[0.14em] text-gold">Monthly EMI</p>
                  <p className="mt-2 text-2xl font-extrabold">{formatCurrency(result.emi)}</p>
                </div>
                <div className="rounded-md bg-mist p-5">
                  <p className="text-sm uppercase tracking-[0.14em] text-emeraldDeep">Total Interest</p>
                  <p className="mt-2 text-2xl font-extrabold">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="rounded-md bg-mist p-5">
                  <p className="text-sm uppercase tracking-[0.14em] text-emeraldDeep">Total Payable</p>
                  <p className="mt-2 text-2xl font-extrabold">{formatCurrency(result.totalPayable)}</p>
                </div>
              </div>
              <div className="mt-8 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={78} outerRadius={118} paddingAngle={4}>
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}

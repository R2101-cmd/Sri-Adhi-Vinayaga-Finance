import { useMemo, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import AnimatedPage from '../components/AnimatedPage.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const fieldClass = 'focus-ring w-full rounded-md border border-emeraldDeep/14 bg-white px-4 py-3 text-charcoal';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('14000');
const [interestRate, setInterestRate] = useState('2');
const [tenure, setTenure] = useState('10');

const result = useMemo(() => {
  const principal = loanAmount === '' ? 0 : Number(loanAmount);
  const rate = interestRate === '' ? 0 : Number(interestRate);
  const months = tenure === '' ? 0 : Number(tenure);

  const totalInterest = (principal * rate * months) / 100;
  const totalPayable = principal + totalInterest;
  const emi = months > 0 ? totalPayable / months : 0;

  return {
    principal,
    emi,
    totalPayable,
    totalInterest,
  };
}, [loanAmount, interestRate, tenure]);

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
                  Loan Amount
                  <input className={fieldClass} type="number" value={loanAmount} onChange={(event) => setLoanAmount((event.target.value))} />
                </label>
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Interest Rate (%) Per Month
                  <input className={fieldClass} type="number" step="0.1" value={interestRate} onChange={(event) => setInterestRate((event.target.value))} />
                </label>
                <label className="grid gap-2 font-bold text-emeraldDeep">
                  Loan Tenure (Months)
                  <input className={fieldClass} type="number" value={tenure} onChange={(event) => setTenure((event.target.value))} />
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

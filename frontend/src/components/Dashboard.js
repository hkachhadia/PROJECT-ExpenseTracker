import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
      setLoading(false);

      const income = res.data.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
      const expense = res.data.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
      setSummary({ income, expense });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div className="card" style={{ flex: 1 }}>
          <h4>Income</h4>
          <p style={{ color: '#4caf50', fontWeight: 'bold' }}>${summary.income}</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Expense</h4>
          <p style={{ color: '#f44336', fontWeight: 'bold' }}>${summary.expense}</p>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <h4>Balance</h4>
          <p style={{ color: '#ffca28', fontWeight: 'bold' }}>${summary.income - summary.expense}</p>
        </div>
      </div>

      <div className="card">
        <h3>Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td style={{ color: t.type==='income' ? '#4caf50' : '#f44336' }}>${t.amount}</td>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

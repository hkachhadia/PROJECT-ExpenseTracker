import React, { useState } from 'react';
import axios from 'axios';

const AddTransaction = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first.');

    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { title, amount, type, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle(''); setAmount(''); setType('income'); setCategory(''); setDate('');
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add transaction.');
    }
  };

  return (
    <div className="card">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <button type="submit" className="button">Add</button>
      </form>
    </div>
  );
};

export default AddTransaction;

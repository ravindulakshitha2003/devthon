import React, { useState, useEffect } from 'react';
import './BudgetPlanPage.css';

const BudgetPlanPage = () => {
  const [persons, setPersons] = useState(1);
  const [days, setDays] = useState(3);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const [budgetBreakdown] = useState({
    transport: { min: 2500, max: 3500 },
    accommodation: { min: 14000, max: 20000 },
    food: { min: 8000, max: 10000 },
    activities: { min: 1000, max: 1500 },
    miscellaneous: { min: 1000, max: 2000 },
  });

  const calculateTotal = () => {
    let total = 0;
    Object.values(budgetBreakdown).forEach(category => {
      const avg = (category.min + category.max) / 2;
      total += avg;
    });
    return Math.round(total * persons * (days / 3)); // Normalize to base 3 days
  };

  const [totalCost, setTotalCost] = useState(calculateTotal());

  useEffect(() => {
    setTotalCost(calculateTotal());
  }, [persons, days]);

  const getBudgetType = () => {
    if (totalCost < 30000) return 'low';
    if (totalCost <= 60000) return 'mid';
    return 'luxury';
  };

  const getBudgetTypePosition = () => {
    // Calculate position percentage for the indicator
    const maxBudget = 100000;
    const percentage = Math.min((totalCost / maxBudget) * 100, 100);
    return percentage;
  };

  const handleAdjust = () => {
    // Trigger recalculation (already handled by useEffect)
    alert('Budget adjusted!');
  };

  return (
    <div className="budget-page">
      <header className="header">

        <img src="/logo.png" alt="Tuora Logo" className="site-logo" />
        <button className="dashboard-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="login-btn gradient-bg" onClick={() => navigate('/login')}>Login</button>

      </header>

      <div className="container">
        <div className="title-section">
          <h1>Total Estimated Budget</h1>
          <p className="subtitle">A Simple Breakdown On Your Preferences</p>
        </div>

        <button className="back-button">Back to my plan</button>

        <div className="summary-section">
          <div className="total-cost-card">
            <label>Total Estimated Cost</label>
            <h2>LKR {totalCost.toLocaleString()}</h2>
            <p className="details">For {days} Days · {persons} person{persons > 1 ? 's' : ''}</p>
          </div>

          <div className="budget-type-card">
            <label>Budget Type</label>
            <div className="budget-type-bar">
              <div className="budget-segments">
                <div className="segment low"></div>
                <div className="segment mid"></div>
                <div className="segment luxury"></div>
              </div>
              <div 
                className="budget-indicator" 
                style={{ left: `${getBudgetTypePosition()}%` }}
              ></div>
            </div>
            <div className="budget-labels">
              <span className="label-low">Low</span>
              <span className="label-mid">Mid-Range</span>
              <span className="label-luxury">Luxury</span>
            </div>
          </div>
        </div>

        <div className="category-breakdown">
          <div className="category-card">
            <h3>Transport</h3>
            <p>LKR {budgetBreakdown.transport.min.toLocaleString()} - {budgetBreakdown.transport.max.toLocaleString()}</p>
          </div>
          <div className="category-card">
            <h3>Accommodation</h3>
            <p>LKR {budgetBreakdown.accommodation.min.toLocaleString()} - {budgetBreakdown.accommodation.max.toLocaleString()}</p>
          </div>
          <div className="category-card">
            <h3>Food</h3>
            <p>LKR {budgetBreakdown.food.min.toLocaleString()} - {budgetBreakdown.food.max.toLocaleString()}</p>
          </div>
          <div className="category-card">
            <h3>Activities</h3>
            <p>LKR {budgetBreakdown.activities.min.toLocaleString()} - {budgetBreakdown.activities.max.toLocaleString()}</p>
          </div>
          <div className="category-card">
            <h3>Miscellaneous</h3>
            <p>LKR {budgetBreakdown.miscellaneous.min.toLocaleString()} - {budgetBreakdown.miscellaneous.max.toLocaleString()}</p>
          </div>
        </div>

        <p className="disclaimer">Costs are estimated and may vary based on availability</p>

        <div className="adjustment-panel">
          <h3>Readjust the Budget Estimation</h3>
          <div className="input-row">
            <div className="input-group">
              <label>No of person</label>
              <input 
                type="number" 
                min="1" 
                value={persons} 
                onChange={(e) => setPersons(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="input-group">
              <label>No of days</label>
              <input 
                type="number" 
                min="1" 
                value={days} 
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          <div className="input-group full-width">
            <label>Anything to add</label>
            <input 
              type="text" 
              value={additionalNotes} 
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Additional preferences..."
            />
          </div>
          <button className="adjust-button" onClick={handleAdjust}>
            Adjust Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanPage;
import React from 'react'

function RevenueChart() {
      const [timeRange, setTimeRange] = React.useState('year');
      const chartRef = React.useRef(null);
      
      React.useEffect(() => {
        // Simulated chart data
        const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
        const data = [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 91];
        
        // Create a simple bar chart visualization
        if (chartRef.current) {
          const ctx = chartRef.current;
          const width = ctx.width;
          const height = ctx.height;
          const barWidth = (width - 60) / data.length - 10;
          const maxValue = Math.max(...data);
          
          const canvas = ctx.getContext('2d');
          canvas.clearRect(0, 0, width, height);
          
          // Draw axes
          canvas.beginPath();
          canvas.moveTo(40, 20);
          canvas.lineTo(40, height - 40);
          canvas.lineTo(width - 20, height - 40);
          canvas.strokeStyle = '#E2E8F0';
          canvas.stroke();
          
          // Draw bars
          data.forEach((value, index) => {
            const x = 50 + index * (barWidth + 10);
            const barHeight = ((height - 60) * value) / maxValue;
            const y = height - 40 - barHeight;
            
            // Draw bar
            const gradient = canvas.createLinearGradient(x, y, x, height - 40);
            gradient.addColorStop(0, '#00BFFF');
            gradient.addColorStop(1, '#87CEFA');
            
            canvas.fillStyle = gradient;
            canvas.fillRect(x, y, barWidth, barHeight);
            
            // Draw month label
            canvas.fillStyle = '#718096';
            canvas.font = '12px Inter';
            canvas.textAlign = 'center';
            canvas.fillText(months[index], x + barWidth / 2, height - 20);
          });
          
          // Draw value labels
          canvas.fillStyle = '#718096';
          canvas.font = '12px Inter';
          canvas.textAlign = 'right';
          
          const valueStep = maxValue / 5;
          for (let i = 0; i <= 5; i++) {
            const value = i * valueStep;
            const y = height - 40 - ((height - 60) * value) / maxValue;
            canvas.fillText(Math.round(value).toLocaleString() + 'tr', 35, y + 4);
            
            // Draw grid line
            canvas.beginPath();
            canvas.moveTo(40, y);
            canvas.lineTo(width - 20, y);
            canvas.strokeStyle = 'rgba(226, 232, 240, 0.5)';
            canvas.stroke();
          }
        }
      }, [timeRange]);
      
      return (
        <div className="bg-card shadow-card rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-textPrimary">Doanh thu theo tháng</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'gradient-bg text-white' : 'bg-gray-100 text-textSecondary hover:bg-gray-200'} transition-colors`}
              >
                Năm nay
              </button>
              <button 
                onClick={() => setTimeRange('lastYear')}
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'lastYear' ? 'gradient-bg text-white' : 'bg-gray-100 text-textSecondary hover:bg-gray-200'} transition-colors`}
              >
                Năm trước
              </button>
            </div>
          </div>
          <div className="h-80">
            <canvas ref={chartRef} width="800" height="320"></canvas>
          </div>
        </div>
      );
    }


export default RevenueChart

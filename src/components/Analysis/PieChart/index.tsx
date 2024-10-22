'use client';

import styles from './index.module.css';

const CircleChart = ({ percentages }: { percentages: number[] }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    console.log(circumference)
    const colors = ["green", "orange", "red", "blue"];

    let offset = 0;

    return (
        <svg width="120" height="120">
            <circle
                className={styles.backgroundCircle}
                r={radius}
                cx="60"
                cy="60"
                strokeWidth="10"
            />
            {percentages.map((percentage, index) => {
                const strokeDasharray = `${(percentage / 50) * circumference} ${circumference}`;
                const strokeDashoffset = offset;

                offset += percentage;

                return (
                    <circle
                        className={styles.circle}
                        key={index}
                        stroke={colors[index]}
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        strokeWidth="10"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        transform={`rotate(${-90} 60 60)`}
                    />
                );
            })}
        </svg>
    );
};

export default CircleChart;

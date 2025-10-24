import 'dotenv/config'
import winston from 'winston';

// 🧱 Create a new Winston logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // sets minimum log level (error, warn, info, debug)
  
  // Define how logs are formatted
  format: winston.format.combine(
    winston.format.timestamp(),              // adds timestamp to logs
    winston.format.errors({ stack: true }),  // include stack trace for errors
    winston.format.json()                    // output logs as structured JSON
  ),

  // Add metadata that tags the log source (useful in microservices)
  defaultMeta: { service: 'acquisition-api' },

  // Define where to store logs
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),   // Errors only
    new winston.transports.File({ filename: 'logs/combined.log' }),                // All logs
  ],
});

// 🌐 Log to console only when not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // adds colors by log level
        winston.format.simple()     // makes it human-readable in the console
      ),
    })
  );
}

export default logger;

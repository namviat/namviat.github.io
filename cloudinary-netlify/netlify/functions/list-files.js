// netlify/functions/list-files.js
const cloudinary = require('cloudinary').v2;

exports.handler = async (event, context) => {
  // Your Cloudinary credentials
  const CLOUD_NAME = 'dzvz7kzin';
  const API_KEY = '484797141727837';
  const API_SECRET = '0AhRs9vHrqghA5ZcXRyMckXlGjk';
  const UPLOAD_FOLDER = 'mycloud';

  // Configure Cloudinary with your credentials
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
  });

  try {
    // Make the authenticated request from the serverless function
    const result = await cloudinary.search
      .expression(`folder=${UPLOAD_FOLDER}`)
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    // The function is successful, return the file list
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.resources),
    };
  } catch (error) {
    console.error('Cloudinary API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch files from Cloudinary.' }),
    };
  }
};

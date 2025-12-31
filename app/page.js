export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            🤖 Facebook Messenger Bot
          </h1>
          <h2 style={{
            fontSize: '1.8rem',
            color: '#667eea',
            marginBottom: '20px'
          }}>
            MD Siam Islam
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: '1.6'
          }}>
            স্বয়ংক্রিয় গ্রাহক সেবা সিস্টেম<br/>
            Automated Customer Service System
          </p>
        </div>

        <div style={{
          background: '#f8f9fa',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ✨ Features / বৈশিষ্ট্য
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            fontSize: '1rem',
            color: '#555',
            lineHeight: '2'
          }}>
            <li>✅ Welcome Message / স্বাগত বার্তা</li>
            <li>✅ Main Menu with Buttons / বাটন সহ মূল মেনু</li>
            <li>✅ Quick Replies / দ্রুত উত্তর</li>
            <li>✅ 24/7 Auto-Reply / ২৪/৭ স্বয়ংক্রিয় উত্তর</li>
            <li>✅ Bilingual Support (Bangla + English) / দ্বিভাষিক সমর্থন</li>
            <li>✅ Product Information / পণ্য তথ্য</li>
            <li>✅ Admin Contact / এডমিন যোগাযোগ</li>
            <li>✅ FAQ System / প্রশ্নোত্তর ব্যবস্থা</li>
          </ul>
        </div>

        <div style={{
          background: '#e3f2fd',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ⚙️ Setup Instructions / সেটআপ নির্দেশনা
          </h3>
          <ol style={{
            paddingLeft: '20px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.8'
          }}>
            <li><strong>Create Facebook App:</strong> Go to developers.facebook.com and create a new app</li>
            <li><strong>Add Messenger Product:</strong> Add Messenger to your app</li>
            <li><strong>Generate Page Access Token:</strong> Connect your page "MD Siam Islam" and generate a token</li>
            <li><strong>Set Environment Variables:</strong>
              <ul style={{ marginTop: '10px' }}>
                <li><code>PAGE_ACCESS_TOKEN</code> - Your page access token</li>
                <li><code>VERIFY_TOKEN</code> - Any string (e.g., "md_siam_islam_verify_token_2024")</li>
              </ul>
            </li>
            <li><strong>Deploy to Vercel:</strong> This app is ready to deploy</li>
            <li><strong>Setup Webhook:</strong>
              <ul style={{ marginTop: '10px' }}>
                <li>Callback URL: <code>https://your-domain.vercel.app/api/webhook</code></li>
                <li>Verify Token: Same as your VERIFY_TOKEN</li>
                <li>Subscribe to: messages, messaging_postbacks</li>
              </ul>
            </li>
            <li><strong>Configure Get Started Button:</strong> Use Facebook API to set up the get started button</li>
          </ol>
        </div>

        <div style={{
          background: '#fff3cd',
          borderRadius: '15px',
          padding: '25px',
          border: '2px solid #ffc107'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#856404',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🔐 Important Notes / গুরুত্বপূর্ণ নোট
          </h3>
          <ul style={{
            paddingLeft: '20px',
            fontSize: '0.9rem',
            color: '#856404',
            lineHeight: '1.6',
            marginBottom: 0
          }}>
            <li>Keep your PAGE_ACCESS_TOKEN secure and never share it</li>
            <li>Test the bot thoroughly before going live</li>
            <li>Monitor the bot responses and update as needed</li>
            <li>Customize messages according to your actual products and services</li>
            <li>Update admin contact information in the code</li>
          </ul>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f0f0f0',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#666',
            margin: 0
          }}>
            📱 Bot Status: <strong style={{ color: '#28a745' }}>Ready to Deploy</strong><br/>
            🌐 Webhook Endpoint: <code>/api/webhook</code>
          </p>
        </div>
      </div>
    </div>
  );
}

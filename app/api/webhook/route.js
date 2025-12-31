export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'md_siam_islam_verify_token_2024';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
}

export async function POST(request) {
  const body = await request.json();

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhookEvent = entry.messaging[0];
      const senderId = webhookEvent.sender.id;

      if (webhookEvent.message) {
        await handleMessage(senderId, webhookEvent.message);
      } else if (webhookEvent.postback) {
        await handlePostback(senderId, webhookEvent.postback);
      }
    }

    return new Response('EVENT_RECEIVED', { status: 200 });
  }

  return new Response('Not Found', { status: 404 });
}

async function handleMessage(senderId, message) {
  const messageText = message.text?.toLowerCase();

  if (messageText) {
    if (messageText.includes('হাই') || messageText.includes('হ্যালো') || messageText.includes('hello') || messageText.includes('hi')) {
      await sendWelcomeMessage(senderId);
    } else if (messageText.includes('product') || messageText.includes('পণ্য')) {
      await sendProductInfo(senderId);
    } else if (messageText.includes('admin') || messageText.includes('এডমিন')) {
      await sendAdminContact(senderId);
    } else if (messageText.includes('help') || messageText.includes('সাহায্য')) {
      await sendMainMenu(senderId);
    } else if (messageText.includes('price') || messageText.includes('দাম')) {
      await sendPriceInfo(senderId);
    } else if (messageText.includes('order') || messageText.includes('অর্ডার')) {
      await sendOrderInfo(senderId);
    } else if (messageText.includes('delivery') || messageText.includes('ডেলিভারি')) {
      await sendDeliveryInfo(senderId);
    } else if (messageText.includes('payment') || messageText.includes('পেমেন্ট')) {
      await sendPaymentInfo(senderId);
    } else {
      await sendMainMenu(senderId);
    }
  } else if (message.quick_reply) {
    await handleQuickReply(senderId, message.quick_reply.payload);
  }
}

async function handlePostback(senderId, postback) {
  const payload = postback.payload;

  switch (payload) {
    case 'GET_STARTED':
      await sendWelcomeMessage(senderId);
      break;
    case 'VIEW_PRODUCTS':
      await sendProductInfo(senderId);
      break;
    case 'TALK_TO_ADMIN':
      await sendAdminContact(senderId);
      break;
    case 'FAQ':
      await sendFAQ(senderId);
      break;
    case 'MAIN_MENU':
      await sendMainMenu(senderId);
      break;
    default:
      await sendMainMenu(senderId);
  }
}

async function handleQuickReply(senderId, payload) {
  switch (payload) {
    case 'PRODUCT_INFO':
      await sendProductInfo(senderId);
      break;
    case 'PRICE_INFO':
      await sendPriceInfo(senderId);
      break;
    case 'ORDER_INFO':
      await sendOrderInfo(senderId);
      break;
    case 'DELIVERY_INFO':
      await sendDeliveryInfo(senderId);
      break;
    case 'PAYMENT_INFO':
      await sendPaymentInfo(senderId);
      break;
    case 'TALK_TO_ADMIN':
      await sendAdminContact(senderId);
      break;
    default:
      await sendMainMenu(senderId);
  }
}

async function sendWelcomeMessage(senderId) {
  const message = {
    text: `🙏 স্বাগতম MD Siam Islam এ!\n\nWelcome to MD Siam Islam!\n\nআপনাকে সাহায্য করতে পেরে আমরা খুশি।\nHow can we assist you today?`,
    quick_replies: [
      {
        content_type: 'text',
        title: '📦 View Products / পণ্য দেখুন',
        payload: 'PRODUCT_INFO'
      },
      {
        content_type: 'text',
        title: '💬 Talk to Admin / এডমিন',
        payload: 'TALK_TO_ADMIN'
      },
      {
        content_type: 'text',
        title: '❓ FAQ / প্রশ্ন',
        payload: 'FAQ'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendMainMenu(senderId) {
  const message = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: '📋 Main Menu / মূল মেনু\n\nPlease select an option:\nদয়া করে একটি অপশন নির্বাচন করুন:',
        buttons: [
          {
            type: 'postback',
            title: '📦 View Products / পণ্য',
            payload: 'VIEW_PRODUCTS'
          },
          {
            type: 'postback',
            title: '💬 Talk to Admin / এডমিন',
            payload: 'TALK_TO_ADMIN'
          },
          {
            type: 'postback',
            title: '❓ FAQ / প্রশ্ন',
            payload: 'FAQ'
          }
        ]
      }
    }
  };

  await callSendAPI(senderId, message);
}

async function sendProductInfo(senderId) {
  const message = {
    text: `📦 আমাদের পণ্য সম্পর্কে\nAbout Our Products:\n\n✅ উচ্চমানের পণ্য / High-quality products\n✅ সাশ্রয়ী মূল্য / Affordable prices\n✅ দ্রুত ডেলিভারি / Fast delivery\n\n📱 আরো জানতে এডমিনের সাথে যোগাযোগ করুন\nContact admin for more details!`,
    quick_replies: [
      {
        content_type: 'text',
        title: '💰 Price / দাম',
        payload: 'PRICE_INFO'
      },
      {
        content_type: 'text',
        title: '📦 Order / অর্ডার',
        payload: 'ORDER_INFO'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendAdminContact(senderId) {
  const message = {
    text: `👨‍💼 এডমিনের সাথে যোগাযোগ\nContact Admin:\n\n📧 Email: mdsiam@example.com\n📱 Phone: +880 1XXX-XXXXXX\n⏰ Available: 24/7\n\nআপনার মেসেজ পাঠান, আমরা শীঘ্রই উত্তর দেব!\nSend your message, we'll respond soon!\n\n💡 অথবা সরাসরি এই চ্যাটে আপনার প্রশ্ন লিখুন\nOr type your question here directly`,
    quick_replies: [
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendFAQ(senderId) {
  const message = {
    text: `❓ সচরাচর জিজ্ঞাসিত প্রশ্ন / FAQ:\n\n1️⃣ পণ্যের দাম কত?\n   What are the prices?\n   → দাম পণ্য অনুযায়ী ভিন্ন / Varies by product\n\n2️⃣ ডেলিভারি কত সময় লাগে?\n   How long is delivery?\n   → 2-5 কর্মদিবস / 2-5 business days\n\n3️⃣ পেমেন্ট পদ্ধতি?\n   Payment methods?\n   → বিকাশ, নগদ, ক্যাশ অন ডেলিভারি / bKash, Nagad, Cash on Delivery\n\n4️⃣ রিটার্ন পলিসি?\n   Return policy?\n   → 7 দিনের মধ্যে / Within 7 days`,
    quick_replies: [
      {
        content_type: 'text',
        title: '🚚 Delivery / ডেলিভারি',
        payload: 'DELIVERY_INFO'
      },
      {
        content_type: 'text',
        title: '💳 Payment / পেমেন্ট',
        payload: 'PAYMENT_INFO'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendPriceInfo(senderId) {
  const message = {
    text: `💰 মূল্য তালিকা / Price List:\n\nপণ্যের দাম বিস্তারিত জানতে এডমিনের সাথে যোগাযোগ করুন।\nContact admin for detailed pricing.\n\n📱 বিশেষ অফার চলছে!\nSpecial offers available!`,
    quick_replies: [
      {
        content_type: 'text',
        title: '💬 Contact Admin / যোগাযোগ',
        payload: 'TALK_TO_ADMIN'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendOrderInfo(senderId) {
  const message = {
    text: `📦 অর্ডার করার নিয়ম / How to Order:\n\n1️⃣ পছন্দের পণ্য নির্বাচন করুন\n   Select your product\n\n2️⃣ এডমিনকে মেসেজ করুন\n   Message the admin\n\n3️⃣ অর্ডার কনফার্ম করুন\n   Confirm your order\n\n4️⃣ পেমেন্ট করুন\n   Make payment\n\n5️⃣ পণ্য রিসিভ করুন\n   Receive your product`,
    quick_replies: [
      {
        content_type: 'text',
        title: '💬 Order Now / অর্ডার করুন',
        payload: 'TALK_TO_ADMIN'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendDeliveryInfo(senderId) {
  const message = {
    text: `🚚 ডেলিভারি তথ্য / Delivery Information:\n\n⏱️ ডেলিভারি সময়:\n   Delivery Time:\n   • ঢাকার ভিতরে: 1-2 দিন / Dhaka: 1-2 days\n   • ঢাকার বাইরে: 3-5 দিন / Outside: 3-5 days\n\n💵 ডেলিভারি চার্জ:\n   Delivery Charge:\n   • ঢাকার ভিতরে: ৬০ টাকা / Dhaka: 60 TK\n   • ঢাকার বাইরে: ১২০ টাকা / Outside: 120 TK\n\n📍 সারাদেশে ডেলিভারি সুবিধা\n   Nationwide delivery available`,
    quick_replies: [
      {
        content_type: 'text',
        title: '💬 Contact Admin / যোগাযোগ',
        payload: 'TALK_TO_ADMIN'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function sendPaymentInfo(senderId) {
  const message = {
    text: `💳 পেমেন্ট পদ্ধতি / Payment Methods:\n\n✅ বিকাশ / bKash\n✅ নগদ / Nagad\n✅ রকেট / Rocket\n✅ ব্যাংক ট্রান্সফার / Bank Transfer\n✅ ক্যাশ অন ডেলিভারি / Cash on Delivery\n\n🔒 সম্পূর্ণ নিরাপদ পেমেন্ট\n   100% secure payment\n\n💡 অগ্রিম পেমেন্টে ডিসকাউন্ট!\n   Discount on advance payment!`,
    quick_replies: [
      {
        content_type: 'text',
        title: '💬 Contact Admin / যোগাযোগ',
        payload: 'TALK_TO_ADMIN'
      },
      {
        content_type: 'text',
        title: '🏠 Back to Menu / মেনু',
        payload: 'MAIN_MENU'
      }
    ]
  };

  await callSendAPI(senderId, message);
}

async function callSendAPI(senderId, message) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  if (!PAGE_ACCESS_TOKEN) {
    console.error('PAGE_ACCESS_TOKEN is not set');
    return;
  }

  const requestBody = {
    recipient: { id: senderId },
    message: message
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error sending message:', error);
    }
  } catch (error) {
    console.error('Error calling Send API:', error);
  }
}

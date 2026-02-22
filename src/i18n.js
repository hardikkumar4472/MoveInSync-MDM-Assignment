import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          "nav": {
            "dashboard": "Dashboard",
            "scheduling": "Scheduling",
            "monitoring": "Monitoring",
            "auditLogs": "Audit Logs",
            "requestUpdate": "Request Update",
            "accessRestricted": "Access Restricted",
            "logout": "Logout"
          },
          "hero": {
            "title": "Think Asset Fleet.",
            "subtitle": "Think MoveInSync.",
            "description": "Driven by automation, powered by MoveInSync MDM — simplify your enterprise device management and OTA propagation.",
            "compliance": "Fleet Compliance"
          },
          "stats": {
            "title": "Operational Scale",
            "totalDevices": "Total Devices",
            "fleetCompliance": "Fleet Compliance",
            "inactiveAssets": "Inactive Assets",
            "updateFailures": "Update Failures"
          },
          "charts": {
            "geographic": "Geographic Saturation",
            "distribution": "Version Distribution per City"
          },
          "inventory": {
            "title": "Device Inventory",
            "subtitle": "Enterprise Asset Registry",
            "assetId": "Asset ID",
            "appCore": "App Core",
            "osBuild": "OS Build",
            "region": "Region",
            "heartbeat": "Heartbeat",
            "health": "Health",
            "integrity": "Fleet Integrity Score"
          },
          "propagation": {
            "title": "Upcoming Propagation",
            "maintenance": "MoveInSync MDM: Standard Maintenance",
            "epoch": "Target Epoch",
            "build": "Version Build",
            "wizard": "Enter Deployment Wizard"
          },
          "audit": {
            "title": "System Audit Log",
            "subtitle": "Traceability for Enterprise Governance",
            "user": "User",
            "action": "Action",
            "details": "Details",
            "time": "Time"
          },
          "monitor": {
            "title": "Rollout Monitor",
            "subtitle": "Real-time Deployment Tracking",
            "notified": "Notified",
            "downloading": "Downloading",
            "installing": "Installing",
            "completed": "Completed",
            "failed": "Failed"
          },
          "schedule": {
            "title": "Schedule Fleet Update",
            "subtitle": "Guided Asset Deployment Pipeline",
            "selection": "Selection",
            "targeting": "Targeting",
            "configuration": "Configuration",
            "deployment": "Deployment",
            "back": "Back",
            "next": "Next Step",
            "initiate": "Initiate Fleet Rollout"
          },
          "detail": {
            "title": "Asset Metadata",
            "status": "Operational Status",
            "lastSeen": "Last Heartbeat",
            "updateHistory": "Update Audit Timeline"
          },
          "footer": {
            "tagline": "The world's largest automated transportation and MDM platform for enterprise commuters.",
            "rights": "© 2026 MoveInSync Technology. All rights reserved.",
            "privacy": "Privacy",
            "terms": "Terms",
            "mdm_ops": "MDM operations"
          },
          "intro": {
            "subtitle": "Mobile Device Management (MDM) – Operations Dashboard UI",
            "description": "MoveInSync manages thousands of devices running its mobile application across multiple regions. The MDM system tracks device registrations, app versions, update rollouts, and compliance status.",
            "getStarted": "Get Started"
          },
          "login": {
            "title": "Login",
            "email": "Email",
            "emailPlaceholder": "Your Email",
            "password": "Password",
            "authorize": "Authorize Access",
            "autofill": "Auto-fill Demo Credentials",
            "invalid": "Invalid credentials. Please check and try again."
          }
        }
      },
      hi: {
        translation: {
          "nav": {
            "dashboard": "डैशबोर्ड",
            "scheduling": "शेड्यूलिंग",
            "monitoring": "निगरानी",
            "auditLogs": "ऑडिट लॉग",
            "requestUpdate": "अपडेट अनुरोध",
            "accessRestricted": "पहुंच सीमित",
            "logout": "लॉगआउट"
          },
          "hero": {
            "title": "एसेट फ्लीट सोचें।",
            "subtitle": "MoveInSync सोचें।",
            "description": "स्वचालन द्वारा संचालित, MoveInSync MDM द्वारा सशक्त — अपने एंटरप्राइज डिवाइस प्रबंधन और OTA प्रसार को सरल बनाएं।",
            "compliance": "फ्लीट अनुपालन"
          },
          "stats": {
            "title": "परिचालन पैमाना",
            "totalDevices": "कुल डिवाइस",
            "fleetCompliance": "फ्लीट अनुपालन",
            "inactiveAssets": "निष्क्रिय एसेट",
            "updateFailures": "अपडेट विफलताएं"
          },
          "charts": {
            "geographic": "भौगोलिक संतृप्ति",
            "distribution": "प्रति शहर संस्करण वितरण"
          },
          "inventory": {
            "title": "डिवाइस इन्वेंटरी",
            "subtitle": "एंटरप्राइज एसेट रजिस्ट्री",
            "assetId": "एसेट आईडी",
            "appCore": "ऐप कोर",
            "osBuild": "OS बिल्ड",
            "region": "क्षेत्र",
            "heartbeat": "हार्टबीट",
            "health": "स्वास्थ्य",
            "integrity": "फ्लीट अखंडता स्कोर"
          },
          "propagation": {
            "title": "आगामी प्रसार",
            "maintenance": "MoveInSync MDM: मानक रखरखाव",
            "epoch": "लक्ष्य समय",
            "build": "संस्करण बिल्ड",
            "wizard": "परिनियोजन विज़ार्ड शुरू करें"
          },
          "audit": {
            "title": "सिस्टम ऑडिट लॉग",
            "subtitle": "एंटरप्राइज गवर्नेंस के लिए ट्रैसेबिलिटी",
            "user": "उपयोगकर्ता",
            "action": "कार्रवाई",
            "details": "विवरण",
            "time": "समय"
          },
          "monitor": {
            "title": "रोलआउट मॉनिटर",
            "subtitle": "रीयल-टाइम परिनियोजन ट्रैकिंग",
            "notified": "सूचित",
            "downloading": "डाउनलोड हो रहा है",
            "installing": "इंस्टॉल हो रहा है",
            "completed": "पूरा हुआ",
            "failed": "विफल"
          },
          "schedule": {
            "title": "फ्लीट अपडेट शेड्यूल करें",
            "subtitle": "गाइडेड एसेट परिनियोजन पाइपलाइन",
            "selection": "चयन",
            "targeting": "लक्ष्यीकरण",
            "configuration": "कॉन्फ़िगरेशन",
            "deployment": "परिनियोजन",
            "back": "पीछे",
            "next": "अगला चरण",
            "initiate": "फ्लीट रोलआउट शुरू करें"
          },
          "detail": {
            "title": "एसेट मेटाडेटा",
            "status": "परिचालन स्थिति",
            "lastSeen": "अंतिम हार्टबीट",
            "updateHistory": "अपडेट ऑडिट टाइमलाइन"
          },
          "footer": {
            "tagline": "एंटरप्राइज कम्यूटर्स के लिए दुनिया का सबसे बड़ा स्वचालित परिवहन और MDM प्लेटफॉर्म।",
            "rights": "© 2026 MoveInSync टेक्नोलॉजी। सर्वाधिकार सुरक्षित।",
            "privacy": "गोपनीयता",
            "terms": "शर्तें",
            "mdm_ops": "MDM ऑपरेशंस"
          },
          "intro": {
            "subtitle": "मोबाइल डिवाइस प्रबंधन   ( MDM )  -  ऑपरेशंस डैशबोर्ड UI",
            "description": "MoveInSync अपने मोबाइल एप्लिकेशन को चलाने वाले हजारों उपकरणों को कई क्षेत्रों में प्रबंधित करता है। MDM सिस्टम डिवाइस पंजीकरण, ऐप संस्करण, अपडेट रोलआउट और अनुपालन स्थिति को ट्रैक करता है।",
            "getStarted": "शुरू करें"
          },
          "login": {
            "title": "लॉगइन",
            "email": "ईमेल",
            "emailPlaceholder": "आपका ईमेल",
            "password": "पासवर्ड",
            "authorize": "पहुंच अधिकृत करें",
            "autofill": "डेमो क्रेडेंशियल ऑटो-फिल करें",
            "invalid": "अमान्य क्रेडेंशियल। कृपया जांचें और पुनः प्रयास करें।"
          }
        }
      },
      kn: {
        translation: {
          "nav": {
            "dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            "scheduling": "ವೇಳಾಪಟ್ಟಿ",
            "monitoring": "ಮೇಲ್ವಿಚಾರಣೆ",
            "auditLogs": "ಆಡಿಟ್ ಲಾಗ್‌ಗಳು",
            "requestUpdate": "ಅಪ್‌ಡೇಟ್ ವಿನಂತಿಸಿ",
            "accessRestricted": "ಪ್ರವೇಶ ಸೀಮಿತವಾಗಿದೆ",
            "logout": "ಲಾಗ್‌ಔಟ್"
          },
          "hero": {
            "title": "ಆಸ್ತಿ ಫ್ಲೀಟ್ ಬಗ್ಗೆ ಯೋಚಿಸಿ.",
            "subtitle": "MoveInSync ಬಗ್ಗೆ ಯೋಚಿಸಿ.",
            "description": "ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಚಾಲಿತ, MoveInSync MDM ನಿಂದ ಸಶಕ್ತಗೊಂಡಿದೆ — ನಿಮ್ಮ ಉದ್ಯಮ ಸಾಧನ ನಿರ್ವಹಣೆ ಮತ್ತು OTA ಸಂವಹನವನ್ನು ಸರಳಗೊಳಿಸಿ.",
            "compliance": "ಫ್ಲೀಟ್ ಅನುಸರಣೆ"
          },
          "stats": {
            "title": "ಕಾರ್ಯಾಚರಣೆಯ ಪ್ರಮಾಣ",
            "totalDevices": "ಒಟ್ಟು ಸಾಧನಗಳು",
            "fleetCompliance": "ಫ್ಲೀಟ್ ಅನುಸರಣೆ",
            "inactiveAssets": "ನಿಷ್ಕ್ರಿಯ ಆಸ್ತಿಗಳು",
            "updateFailures": "ಅಪ್‌ಡೇಟ್ ವಿಫಲತೆಗಳು"
          },
          "charts": {
            "geographic": "ಭೌಗೋಳಿಕ ಸ್ಯಾಚುರೇಶನ್",
            "distribution": "ಪ್ರತಿ ನಗರದ ಆವೃತ್ತಿ ವಿತರಣೆ"
          },
          "inventory": {
            "title": "ಸಾಧನ ದಾಸ್ತಾನು",
            "subtitle": "ಎಂಟರ್‌ಪ್ರೈಸ್ ಆಸ್ತಿ ನೋಂದಣಿ",
            "assetId": "ಆಸ್ತಿ ಐಡಿ",
            "appCore": "ಆ್ಯಪ್ ಕೋರ್",
            "osBuild": "OS ಬಿಲ್ಡ್",
            "region": "ಪ್ರದೇಶ",
            "heartbeat": "ಹಾರ್ಟ್‌ಬೀಟ್",
            "health": "ಆರೋಗ್ಯ",
            "integrity": "ಫ್ಲೀಟ್ ಸಮಗ್ರತೆಯ ಸ್ಕೋರ್"
          },
          "propagation": {
            "title": "ಮುಂಬರುವ ಸಂವಹನ",
            "maintenance": "MoveInSync MDM: ಪ್ರಮಾಣಿತ ನಿರ್ವಹಣೆ",
            "epoch": "ಗುರಿ ಸಮಯ",
            "build": "ಆವೃತ್ತಿ ಬಿಲ್ಡ್",
            "wizard": "ನಿಯೋಜನೆ ವಿಝಾರ್ಡ್ ಪ್ರಾರಂಭಿಸಿ"
          },
          "audit": {
            "title": "ಸಿಸ್ಟಮ್ ಆಡಿಟ್ ಲಾಗ್",
            "subtitle": "ಎಂಟರ್‌ಪ್ರೈಸ್ ಆಡಳಿತಕ್ಕಾಗಿ ಪತ್ತೆದಾರಿ",
            "user": "ಬಳಕೆದಾರ",
            "action": "ಕಾರ್ಯ",
            "details": "ವಿವರಗಳು",
            "time": "ಸಮಯ"
          },
          "monitor": {
            "title": "ರೋಲ್‌ಔಟ್ ಮಾನಿಟರ್",
            "subtitle": "ನೈಜ-ಸಮಯದ ನಿಯೋಜನೆ ಟ್ರ್ಯಾಕಿಂಗ್",
            "notified": "ಸೂಚಿಸಲಾಗಿದೆ",
            "downloading": "ಡೌನ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ",
            "installing": "ಇನ್‌ಸ್ಟಾಲ್ ಆಗುತ್ತಿದೆ",
            "completed": "ಪೂರ್ಣಗೊಂಡಿದೆ",
            "failed": "ವಿಫಲವಾಗಿದೆ"
          },
          "schedule": {
            "title": "ಫ್ಲೀಟ್ ಅಪ್‌ಡೇಟ್ ವೇಳಾಪಟ್ಟಿ ಮಾಡಿ",
            "subtitle": "ಸಂಘಟಿತ ಆಸ್ತಿ ನಿಯೋಜನೆ ಪೈಪ್‌ಲೈನ್",
            "selection": "ಆಯ್ಕೆ",
            "targeting": "ಗುರಿಪಡಿಸುವುದು",
            "configuration": "ಸಂರಚನೆ",
            "deployment": "ನಿಯೋಜನೆ",
            "back": "ಹಿಂದೆ",
            "next": "ಮುಂದಿನ ಹಂತ",
            "initiate": "ಫ್ಲೀಟ್ ರೋಲ್‌ಔಟ್ ಪ್ರಾರಂಭಿಸಿ"
          },
          "detail": {
            "title": "ಆಸ್ತಿ ಮೆಟಾಡೇಟಾ",
            "status": "ಕಾರ್ಯಾಚರಣೆಯ ಸ್ಥಿತಿ",
            "lastSeen": "ಕೊನೆಯ ಹಾರ್ಟ್‌ಬೀಟ್",
            "updateHistory": "ಅಪ್‌ಡೇಟ್ ಆಡಿಟ್ ಟೈಮ್‌ಲೈನ್"
          },
          "footer": {
            "tagline": "ಎಂಟರ್‌ಪ್ರೈಸ್ ಪ್ರಯಾಣಿಕರಿಗಾಗಿ ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಸ್ವಯಂಚಾಲಿತ ಸಾರಿಗೆ ಮತ್ತು MDM ಪ್ಲಾಟ್‌ಫಾರ್ಮ್.",
            "rights": "© 2026 MoveInSync ತಂತ್ರಜ್ಞಾನ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
            "privacy": "ಗೌಪ್ಯತೆ",
            "terms": "ನಿಯಮಗಳು",
            "mdm_ops": "MDM ಕಾರ್ಯಾಚರಣೆಗಳು"
          },
          "intro": {
            "subtitle": "ಮೊಬೈಲ್ ಸಾಧನ ನಿರ್ವಹಣೆ (MDM) – ಕಾರ್ಯಾಚರಣೆಗಳ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ UI",
            "description": "MoveInSync ಹಲವಾರು ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಾವಿರಾರು ಸಾಧನಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ. MDM ಸಿಸ್ಟಮ್ ಸಾಧನ ನೋಂದಣಿಗಳು, ಆಪ್ ಆವೃತ್ತಿಗಳು, ಅಪ್‌ಡೇಟ್ ರೋಲ್‌ಔಟ್‌ಗಳು ಮತ್ತು ಅನುಸರಣೆ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ.",
            "getStarted": "ಪ್ರಾರಂಭಿಸಿ"
          },
          "login": {
            "title": "ಲಾಗ್ ಇನ್",
            "email": "ಇಮೇಲ್",
            "emailPlaceholder": "ನಿಮ್ಮ ಇಮೇಲ್",
            "password": "ಪಾಸ್ವರ್ಡ್",
            "authorize": "ಪ್ರವೇಶವನ್ನು ಅಧಿಕೃತಗೊಳಿಸಿ",
            "autofill": "ಡೆಮೊ ರುಜುವಾತುಗಳನ್ನು ಸ್ವಯಂ-ಭರ್ತಿ ಮಾಡಿ",
            "invalid": "ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });
export default i18n;

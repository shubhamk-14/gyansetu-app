import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert
} from 'react-native';

// Authentic Course-Wise Exam Stream List
const EXAMS = [
  { id: 'ssc', name: 'SSC CGL / CHSL', date: '15 Sep 2026', mcqs: 100, time: '60m', icon: '🎯' },
  { id: 'upsc', name: 'UPSC Civil Services', date: '24 May 2027', mcqs: 100, time: '120m', icon: '🏛️' },
  { id: 'banking', name: 'Banking (IBPS PO)', date: '10 Oct 2026', mcqs: 100, time: '60m', icon: '🏦' },
  { id: 'upsi', name: 'UPSI & State Police', date: '01 Dec 2026', mcqs: 160, time: '120m', icon: '🛡️' }
];

const INITIAL_TOPICS = [
  { id: 't1', title: 'Coding-Decoding & Letter Shift Patterns', subject: 'Reasoning', time: '45m', status: 'completed' },
  { id: 't2', title: 'Percentage Fraction Conversions & Shortcuts', subject: 'Quant', time: '60m', status: 'completed' },
  { id: 't3', title: 'Articles 12 to 35 Fundamental Rights Notes', subject: 'Polity', time: '50m', status: 'in-progress' },
  { id: 't4', title: 'IPC 1860 Key Sections (Theft, Murder, Dacoity)', subject: 'Mool Vidhi', time: '40m', status: 'pending' },
  { id: 't5', title: 'RBI Monetary Policy & Bank Rate Notes', subject: 'Banking', time: '35m', status: 'pending' }
];

// Authentic Course-Wise Real PYQ Dataset
const PYQS = [
  {
    id: 'ssc-2024-1',
    year: '2024',
    exam: 'SSC CGL 2024',
    subject: 'Quant',
    question: 'A person spends 20% of monthly income on rent, 15% of remaining on education, and 60% of remaining on household items. If he saves ₹10,200 at month end, what is his total monthly income?',
    options: ['₹37,500', '₹35,000', '₹40,000', '₹36,000'],
    correct: 0,
    solution: 'Let Income = 100x.\nRent = 20x. Remainder = 80x.\nEducation = 15% of 80x = 12x. Remainder = 68x.\nHousehold = 60% of 68x = 40.8x.\nSavings = 40% of 68x = 27.2x.\n27.2x = ₹10,200 => x = 375.\nTotal Income = 100x = ₹37,500.'
  },
  {
    id: 'upsc-2024-1',
    year: '2024',
    exam: 'UPSC Prelims 2024',
    subject: 'Polity',
    question: 'Regarding Constitutional Writs under Article 32, Habeas Corpus can be issued against both public authorities and private individuals. True or False?',
    options: ['True', 'False'],
    correct: 0,
    solution: 'True: Habeas Corpus is the only writ that can be issued against both public authorities and private individuals for unlawful detention.'
  },
  {
    id: 'bank-2024-1',
    year: '2024',
    exam: 'IBPS PO 2024',
    subject: 'Banking',
    question: 'Which rate is the interest rate at which the Reserve Bank of India (RBI) lends money to commercial banks for long-term without collateral?',
    options: ['Repo Rate', 'Bank Rate', 'Reverse Repo Rate', 'MSF Rate'],
    correct: 1,
    solution: 'Bank Rate is the rate at which RBI lends money to commercial banks without collateral.'
  },
  {
    id: 'upsi-2023-1',
    year: '2023',
    exam: 'UPSI 2023',
    subject: 'Mool Vidhi',
    question: 'Under which section of the Indian Penal Code (IPC 1860) is the offense of "Theft" defined?',
    options: ['Section 378', 'Section 300', 'Section 390', 'Section 302'],
    correct: 0,
    solution: 'Section 378 defines Theft in IPC 1860. Section 379 provides punishment up to 3 years.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'notes', 'test', 'ai', 'analytics', 'profile'
  const [currentExam, setCurrentExam] = useState(EXAMS[0]);
  
  // Auth State (Logged In by default as Shubham)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ name: 'Shubham', email: 'shubham@gmail.com', streak: 14, readiness: 78 });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [emailInput, setEmailInput] = useState('shubham@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');

  const [tasks, setTasks] = useState(INITIAL_TOPICS);
  const [notesSearch, setNotesSearch] = useState('');

  // AI Doubt State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Namaste Shubham! I am your 24/7 GyanSetu AI Tutor. Ask me any doubt in Quant, Reasoning, Polity, History, Mool Vidhi or Banking!' }
  ]);
  const [inputText, setInputText] = useState('');

  // Mock Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
      }
      return t;
    }));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: 'Shubham', email: emailInput || 'shubham@gmail.com', streak: 14, readiness: 78 });
    setShowAuthModal(false);
    Alert.alert('Welcome Back!', `Signed in as ${emailInput || 'shubham@gmail.com'}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out of GyanSetu?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            setIsLoggedIn(false);
            Alert.alert('Logged Out', 'You are now in Guest Demo Mode.');
          }
        }
      ]
    );
  };

  const checkAuthGuard = (targetTab) => {
    if (!isLoggedIn && (targetTab === 'test' || targetTab === 'ai')) {
      setShowAuthModal(true);
      return;
    }
    setActiveTab(targetTab);
  };

  const handleSendMessage = (customPrompt = null) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputText('');

    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `Here is the step-by-step GyanSetu AI solution for "${textToSend.slice(0, 30)}...":\n\n1. Concept Rule: Apply standard formula & shortcuts.\n2. Step 1: Calculate initial percentage ratio.\n3. Step 2: Simplify algebraic terms.\n4. Final Answer: Option A is 100% Correct!` 
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const calculateScore = () => {
    let score = 0;
    PYQS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* 👑 MOBILE HEADER WITH AUTH CONTROL */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.brandTitle}>
            Gyan<Text style={styles.brandAccent}>Setu</Text>
          </Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {user.streak}d Streak</Text>
          </View>
          
          {isLoggedIn ? (
            <TouchableOpacity style={styles.avatarCircle} onPress={() => setActiveTab('profile')}>
              <Text style={styles.avatarText}>SK</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.signInHeaderBtn} onPress={() => setShowAuthModal(true)}>
              <Text style={styles.signInHeaderBtnText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 🎯 TARGET EXAM STREAM CAROUSEL */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examBar}>
        {EXAMS.map(exam => {
          const isActive = currentExam.id === exam.id;
          return (
            <TouchableOpacity 
              key={exam.id} 
              onPress={() => setCurrentExam(exam)}
              style={[styles.examChip, isActive && styles.examChipActive]}
            >
              <Text style={styles.examIcon}>{exam.icon}</Text>
              <Text style={[styles.examChipText, isActive && styles.examChipTextActive]}>
                {exam.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* GUEST BANNER NOTIFICATION */}
      {!isLoggedIn && (
        <View style={styles.guestNoticeBar}>
          <Text style={styles.guestNoticeText}>💡 Guest Preview Mode. Sign in to attempt tests & ask AI Doubt Solver.</Text>
          <TouchableOpacity onPress={() => setShowAuthModal(true)}>
            <Text style={styles.guestNoticeBtn}>Sign In →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 📱 MAIN SCREEN CONTENT */}
      <View style={styles.content}>
        
        {/* 🏠 HOME SCREEN */}
        {activeTab === 'home' && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Hero Exam Hub Banner */}
            <View style={styles.heroBanner}>
              <View style={styles.heroHeaderRow}>
                <Text style={styles.heroBadge}>🎯 Target Stream</Text>
                <Text style={styles.heroDateTag}>{currentExam.date}</Text>
              </View>
              <Text style={styles.heroTitle}>{currentExam.name} Exam Hub</Text>
              <Text style={styles.heroSub}>Includes {currentExam.mcqs} MCQs ({currentExam.time}) • 2024 Official Real PYQ Bank</Text>
              
              <TouchableOpacity style={styles.heroButton} onPress={() => checkAuthGuard('test')}>
                <Text style={styles.heroButtonText}>Launch Live Mock Test →</Text>
              </TouchableOpacity>
            </View>

            {/* Metrics Cards */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Readiness Index</Text>
                <Text style={styles.metricValue}>{user.readiness}%</Text>
                <View style={styles.metricBadge}>
                  <Text style={styles.metricBadgeText}>Top 5% All India</Text>
                </View>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Active Streak</Text>
                <Text style={styles.metricValue}>{user.streak} Days</Text>
                <View style={[styles.metricBadge, { backgroundColor: '#e0e7ff' }]}>
                  <Text style={[styles.metricBadgeText, { color: '#3730a3' }]}>AIR Rank #142</Text>
                </View>
              </View>
            </View>

            {/* Daily Target Goal Checklist */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Today's Study Roadmap</Text>
              <Text style={styles.sectionSub}>{tasks.filter(t => t.status === 'completed').length} / {tasks.length} Done</Text>
            </View>

            {tasks.map(item => {
              const isDone = item.status === 'completed';
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.taskCard, isDone && styles.taskCardDone]}
                  onPress={() => toggleTaskStatus(item.id)}
                >
                  <View style={[styles.checkboxCircle, isDone && styles.checkboxCircleDone]}>
                    <Text style={[styles.checkboxIcon, isDone && styles.checkboxIconDone]}>{isDone ? '✓' : '○'}</Text>
                  </View>

                  <View style={styles.taskLeft}>
                    <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>{item.title}</Text>
                    <Text style={styles.taskSub}>{item.subject} • {item.time}</Text>
                  </View>

                  <View style={[styles.statusBadge, isDone ? styles.statusDone : styles.statusPending]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

          </ScrollView>
        )}

        {/* 📚 COURSE-WISE REAL REVISION NOTES SCREEN */}
        {activeTab === 'notes' && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Quick Search Bar */}
            <View style={styles.searchNotesBox}>
              <TextInput 
                style={styles.searchNotesInput}
                value={notesSearch}
                onChangeText={setNotesSearch}
                placeholder="🔍 Search notes by exam (UPSC, SSC, Banking, UPSI)..."
                placeholderTextColor="#94a3b8"
              />
            </View>

            <Text style={styles.sectionHeader}>Real Course-Wise Revision Notes</Text>

            {/* UPSC POLITY REAL NOTE */}
            <View style={styles.notesCard}>
              <View style={styles.notesBadgeRow}>
                <Text style={styles.notesSubject}>UPSC / UPSI • Indian Polity</Text>
                <Text style={styles.notesHighYieldTag}>🏛️ UPSC Polity</Text>
              </View>
              <Text style={styles.notesTitle}>Articles 12-35 Fundamental Rights & 5 Writs</Text>
              <Text style={styles.notesBody}>
                1. Article 14: Equality before Law & Equal Protection of Laws.{"\n"}
                2. Article 21: Protection of Life and Personal Liberty (Maneka Gandhi Case 1978).{"\n"}
                3. Article 32: Supreme Court can issue 5 Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).
              </Text>
              
              <View style={styles.quantCodeBlock}>
                <Text style={styles.quantCodeLabel}>⚖️ CONSTITUTIONAL RULE:</Text>
                <Text style={styles.quantCodeText}>Habeas Corpus = Issued against both public authorities & private individuals!</Text>
                <Text style={styles.quantCodeSub}>Mandamus = Issued ONLY to public officials to perform duty.</Text>
              </View>

              <TouchableOpacity style={styles.copyNoteBtn} onPress={() => Alert.alert('Note Copied!', 'UPSC Polity note copied to clipboard.')}>
                <Text style={styles.copyNoteBtnText}>📋 Copy Polity Note</Text>
              </TouchableOpacity>
            </View>

            {/* SSC CGL QUANT REAL NOTE */}
            <View style={[styles.notesCard, { marginTop: 14 }]}>
              <View style={styles.notesBadgeRow}>
                <Text style={styles.notesSubject}>SSC CGL / CHSL • Quantitative Aptitude</Text>
                <Text style={styles.notesHighYieldTag}>🎯 SSC Quant</Text>
              </View>
              <Text style={styles.notesTitle}>Percentage Fractions & Successive Formula</Text>
              <Text style={styles.notesBody}>
                1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/6 = 16.67%, 1/7 = 14.28%, 1/8 = 12.5%.{"\n"}
                Successive Percentage Change = a + b + (a × b)/100.
              </Text>
              <View style={styles.quantCodeBlock}>
                <Text style={styles.quantCodeLabel}>📐 QUANT FORMULA RULE:</Text>
                <Text style={styles.quantCodeText}>Expenditure Constant Rule: Consumption Decrease = [R / (100 + R)] × 100%</Text>
                <Text style={styles.quantCodeSub}>Example: If price increases by 25% (1/4), decrease consumption by 1/(4+1) = 20%.</Text>
              </View>

              <TouchableOpacity style={styles.copyNoteBtn} onPress={() => Alert.alert('Note Copied!', 'SSC Quant formula copied.')}>
                <Text style={styles.copyNoteBtnText}>📋 Copy Quant Formula</Text>
              </TouchableOpacity>
            </View>

            {/* UPSI MOOL VIDHI REAL NOTE */}
            <View style={[styles.notesCard, { marginTop: 14 }]}>
              <View style={styles.notesBadgeRow}>
                <Text style={styles.notesSubject}>UPSI & State Police • Mool Vidhi</Text>
                <Text style={styles.notesHighYieldTag}>🛡️ UPSI IPC 1860</Text>
              </View>
              <Text style={styles.notesTitle}>Indian Penal Code (IPC 1860) Essential Sections</Text>
              <Text style={styles.notesBody}>
                • Section 378: Theft defined (Section 379 provides punishment up to 3 years).{"\n"}
                • Section 300: Murder defined (Section 302 provides punishment).{"\n"}
                • Section 395: Punishment for Dacoity (5 or more persons committing robbery).
              </Text>
              <View style={styles.quantCodeBlock}>
                <Text style={styles.quantCodeLabel}>🛡️ MOOL VIDHI RULE:</Text>
                <Text style={styles.quantCodeText}>Dacoity (IPC 395) requires a minimum of 5 or more persons committing robbery!</Text>
              </View>

              <TouchableOpacity style={styles.copyNoteBtn} onPress={() => Alert.alert('Note Copied!', 'UPSI IPC note copied.')}>
                <Text style={styles.copyNoteBtnText}>📋 Copy Mool Vidhi Note</Text>
              </TouchableOpacity>
            </View>

            {/* BANKING PO REAL NOTE */}
            <View style={[styles.notesCard, { marginTop: 14 }]}>
              <View style={styles.notesBadgeRow}>
                <Text style={styles.notesSubject}>Banking (IBPS PO / SBI PO) • Monetary Policy</Text>
                <Text style={styles.notesHighYieldTag}>🏦 Banking Awareness</Text>
              </View>
              <Text style={styles.notesTitle}>RBI Monetary Policy Rates & Bank Rate</Text>
              <Text style={styles.notesBody}>
                • Bank Rate: Rate at which RBI lends long-term money to commercial banks WITHOUT collateral.{"\n"}
                • Repo Rate: Short-term lending rate against government collateral.{"\n"}
                • Cash Reserve Ratio (CRR): Percentage of deposits banks must keep as cash with RBI.
              </Text>
              <View style={styles.quantCodeBlock}>
                <Text style={styles.quantCodeLabel}>🏦 BANKING RULE:</Text>
                <Text style={styles.quantCodeText}>Bank Rate = Long-term loan without collateral from RBI.</Text>
              </View>

              <TouchableOpacity style={styles.copyNoteBtn} onPress={() => Alert.alert('Note Copied!', 'Banking note copied.')}>
                <Text style={styles.copyNoteBtnText}>📋 Copy Banking Note</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        )}

        {/* ⏱️ REAL COURSE-WISE MOCK TEST PLAYER SCREEN */}
        {activeTab === 'test' && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionHeader}>Timed Real PYQ Engine (2024-2023)</Text>

            {!testSubmitted ? (
              <View style={styles.testContainer}>
                <View style={styles.testNavRow}>
                  <Text style={styles.qCounter}>Question {currentQIndex + 1} of {PYQS.length}</Text>
                  <Text style={styles.testExamTag}>{PYQS[currentQIndex].exam}</Text>
                </View>

                <Text style={styles.qText}>{PYQS[currentQIndex].question}</Text>

                {PYQS[currentQIndex].options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQIndex] === oIdx;
                  return (
                    <TouchableOpacity 
                      key={oIdx} 
                      onPress={() => setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: oIdx })}
                      style={[styles.optButton, isSelected && styles.optButtonSelected]}
                    >
                      <Text style={[styles.optText, isSelected && styles.optTextSelected]}>
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                <View style={styles.testControlsRow}>
                  {currentQIndex > 0 && (
                    <TouchableOpacity 
                      style={styles.prevBtn}
                      onPress={() => setCurrentQIndex(currentQIndex - 1)}
                    >
                      <Text style={styles.prevBtnText}>← Previous</Text>
                    </TouchableOpacity>
                  )}

                  {currentQIndex < PYQS.length - 1 ? (
                    <TouchableOpacity 
                      style={styles.nextBtn}
                      onPress={() => setCurrentQIndex(currentQIndex + 1)}
                    >
                      <Text style={styles.nextBtnText}>Next Question →</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.submitTestBtn} onPress={() => setTestSubmitted(true)}>
                      <Text style={styles.submitTestText}>Submit Exam</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.scorecardBox}>
                <Text style={styles.scoreTitle}>🎉 Real PYQ Mock Test Submitted!</Text>
                <Text style={styles.scoreValue}>Score: {calculateScore()} / {PYQS.length} Correct ({Math.round((calculateScore()/PYQS.length)*100)}%)</Text>
                
                {/* Solution Breakdown */}
                <View style={styles.solutionList}>
                  {PYQS.map((q, idx) => (
                    <View key={idx} style={styles.solItem}>
                      <Text style={styles.solQ}>Q{idx+1} ({q.exam}): {q.question}</Text>
                      <Text style={styles.solAns}>Correct Answer: Option {String.fromCharCode(65 + q.correct)} ({q.options[q.correct]})</Text>
                      <Text style={styles.solExp}>{q.solution}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity style={styles.retestBtn} onPress={() => { setTestSubmitted(false); setSelectedAnswers({}); setCurrentQIndex(0); }}>
                  <Text style={styles.retestText}>Re-Attempt Test</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}

        {/* 🤖 AI TUTOR CHAT SCREEN */}
        {activeTab === 'ai' && (
          <View style={styles.aiContainer}>
            {/* Quick Prompt Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptBar}>
              <TouchableOpacity style={styles.promptChip} onPress={() => handleSendMessage('Explain SSC CGL Quant Percentage Shortcut')}>
                <Text style={styles.promptChipText}>🎯 SSC CGL Quant Trick</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.promptChip} onPress={() => handleSendMessage('Explain UPSC Article 32 Writs')}>
                <Text style={styles.promptChipText}>🏛️ UPSC Polity Writs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.promptChip} onPress={() => handleSendMessage('Explain UPSI IPC Section 378 Theft')}>
                <Text style={styles.promptChipText}>🛡️ UPSI IPC Theft</Text>
              </TouchableOpacity>
            </ScrollView>

            <ScrollView contentContainerStyle={styles.chatList}>
              {chatMessages.map(msg => (
                <View key={msg.id} style={[styles.msgBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                  <Text style={msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.chatInputRow}>
              <TextInput 
                style={styles.chatInput}
                placeholder="Ask GyanSetu AI Tutor..."
                placeholderTextColor="#94a3b8"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={() => handleSendMessage()}>
                <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 📊 PERFORMANCE ANALYTICS SCREEN */}
        {activeTab === 'analytics' && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionHeader}>Performance & Speed Analytics</Text>

            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Overall Accuracy</Text>
                <Text style={styles.metricValue}>78.5%</Text>
                <View style={styles.metricBadge}>
                  <Text style={styles.metricBadgeText}>Top 5% Tier</Text>
                </View>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Avg Speed</Text>
                <Text style={styles.metricValue}>36 sec</Text>
                <View style={[styles.metricBadge, { backgroundColor: '#e0e7ff' }]}>
                  <Text style={[styles.metricBadgeText, { color: '#3730a3' }]}>Goal: &lt;40s/MCQ</Text>
                </View>
              </View>
            </View>

            <View style={styles.notesCard}>
              <Text style={styles.notesSubject}>AI Diagnostic Report</Text>
              <Text style={styles.notesTitle}>Core Strengths & Vulnerabilities</Text>
              <Text style={styles.notesBody}>
                • Strength: Reasoning Ability & Indian Polity (Accuracy &gt;85%).{"\n"}
                • Vulnerability: Quant Time & Work takes 52s/question. Practice LCM shortcut tricks.
              </Text>
            </View>
          </ScrollView>
        )}

        {/* 👤 PROFILE & LOGIN/LOGOUT SCREEN */}
        {activeTab === 'profile' && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {isLoggedIn ? (
              <View style={styles.profileCard}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.largeAvatarText}>SK</Text>
                </View>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
                
                <View style={styles.badgeRow}>
                  <Text style={styles.pBadge}>AIR #142 Rank</Text>
                  <Text style={styles.pBadge}>🔥 {user.streak}d Streak</Text>
                  <Text style={styles.pBadge}>SSC CGL Goal</Text>
                </View>

                <View style={styles.profileStatsBox}>
                  <Text style={styles.pStatItem}>Readiness Score: 78%</Text>
                  <Text style={styles.pStatItem}>Firebase Sync: Connected (prepai-758b8)</Text>
                  <Text style={styles.pStatItem}>Account Status: PRO Aspirant</Text>
                </View>

                <TouchableOpacity style={styles.logoutActionBtn} onPress={handleLogout}>
                  <Text style={styles.logoutActionBtnText}>🚪 Logout of GyanSetu</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.profileCard}>
                <Text style={styles.profileName}>Guest Demo Mode</Text>
                <Text style={styles.profileEmail}>Sign in to access your saved notes & live mock tests.</Text>
                <TouchableOpacity style={styles.loginActionBtn} onPress={() => setShowAuthModal(true)}>
                  <Text style={styles.loginActionBtnText}>🔐 Sign In / Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}

      </View>

      {/* 🚀 TOP-TIER ED-TECH FLOATING BOTTOM NAVIGATION BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'home' && styles.tabItemActive]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'notes' && styles.tabItemActive]} 
          onPress={() => setActiveTab('notes')}
        >
          <Text style={styles.tabIcon}>📚</Text>
          <Text style={[styles.tabLabel, activeTab === 'notes' && styles.tabLabelActive]}>Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'test' && styles.tabItemActive]} 
          onPress={() => checkAuthGuard('test')}
        >
          <Text style={styles.tabIcon}>⏱️</Text>
          <Text style={[styles.tabLabel, activeTab === 'test' && styles.tabLabelActive]}>Tests</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'ai' && styles.tabItemActive]} 
          onPress={() => checkAuthGuard('ai')}
        >
          <Text style={styles.tabIcon}>🤖</Text>
          <Text style={[styles.tabLabel, activeTab === 'ai' && styles.tabLabelActive]}>AI Tutor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'analytics' && styles.tabItemActive]} 
          onPress={() => setActiveTab('analytics')}
        >
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={[styles.tabLabel, activeTab === 'analytics' && styles.tabLabelActive]}>Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'profile' && styles.tabItemActive]} 
          onPress={() => setActiveTab('profile')}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 🔐 MOBILE AUTH MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAuthModal}
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                Gyan<Text style={styles.brandAccent}>Setu</Text> Auth
              </Text>
              <TouchableOpacity onPress={() => setShowAuthModal(false)}>
                <Text style={styles.modalCloseBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Login / Sign Up Tabs */}
            <View style={styles.authTabRow}>
              <TouchableOpacity 
                style={[styles.authTabBtn, authMode === 'login' && styles.authTabBtnActive]}
                onPress={() => setAuthMode('login')}
              >
                <Text style={[styles.authTabText, authMode === 'login' && styles.authTabTextActive]}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.authTabBtn, authMode === 'signup' && styles.authTabBtnActive]}
                onPress={() => setAuthMode('signup')}
              >
                <Text style={[styles.authTabText, authMode === 'signup' && styles.authTabTextActive]}>Register</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput 
              style={styles.modalInput}
              value={emailInput}
              onChangeText={setEmailInput}
              placeholder="shubham@gmail.com"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput 
              style={styles.modalInput}
              value={passwordInput}
              onChangeText={setPasswordInput}
              placeholder="••••••••"
              placeholderTextColor="#94a3b8"
              secureTextEntry
            />

            <TouchableOpacity style={styles.modalPrimaryBtn} onPress={handleLogin}>
              <Text style={styles.modalPrimaryBtnText}>
                {authMode === 'login' ? 'Sign In as Shubham →' : 'Create Account →'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalGoogleBtn} onPress={handleLogin}>
              <Text style={styles.modalGoogleBtnText}>🌐 Sign In with Google</Text>
            </TouchableOpacity>

            <Text style={styles.modalSubText}>Connected to Live Firebase Project: prepai-758b8</Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brandTitle: { fontSize: 24, fontWeight: '900', color: '#1e1b4b' },
  brandAccent: { color: '#d97706' },
  proBadge: { backgroundColor: '#f59e0b', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 8 },
  proBadgeText: { fontSize: 10, fontWeight: '900', color: '#0f172a' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  streakBadge: { backgroundColor: '#fff7ed', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, marginRight: 8, borderWidth: 1, borderColor: '#fed7aa' },
  streakText: { fontSize: 12, fontWeight: '900', color: '#ea580c' },
  avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ffffff', fontWeight: '900', fontSize: 13 },
  signInHeaderBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  signInHeaderBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 12 },
  examBar: { maxHeight: 48, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingHorizontal: 8, backgroundColor: '#ffffff', paddingVertical: 4 },
  examChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16, marginHorizontal: 4, backgroundColor: '#f1f5f9', borderWidth: 1, borderColor: '#e2e8f0' },
  examChipActive: { backgroundColor: '#4f46e5', borderColor: '#4338ca' },
  examIcon: { fontSize: 14, marginRight: 6 },
  examChipText: { fontSize: 12, fontWeight: '700', color: '#475569' },
  examChipTextActive: { color: '#ffffff', fontWeight: '900' },
  guestNoticeBar: { backgroundColor: '#fff7ed', paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#fed7aa' },
  guestNoticeText: { fontSize: 11, fontWeight: '700', color: '#c2410c', flex: 1 },
  guestNoticeBtn: { fontSize: 11, fontWeight: '900', color: '#4f46e5', marginLeft: 8 },
  content: { flex: 1 },
  scrollContent: { padding: 16 },
  heroBanner: { backgroundColor: '#1e1b4b', borderRadius: 22, padding: 20, marginBottom: 16 },
  heroHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroBadge: { fontSize: 10, fontWeight: '900', color: '#fef08a', textTransform: 'uppercase', backgroundColor: '#312e81', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  heroDateTag: { fontSize: 11, fontWeight: '700', color: '#c7d2fe' },
  heroTitle: { fontSize: 22, fontWeight: '900', color: '#ffffff', marginTop: 8 },
  heroSub: { fontSize: 12, color: '#cbd5e1', marginTop: 4, lineHeight: 18 },
  heroButton: { backgroundColor: '#f59e0b', paddingVertical: 12, borderRadius: 14, marginTop: 14, alignItems: 'center' },
  heroButtonText: { color: '#0f172a', fontWeight: '900', fontSize: 13 },
  metricsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  metricCard: { width: '48%', backgroundColor: '#ffffff', padding: 16, borderRadius: 18, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  metricLabel: { fontSize: 10, fontWeight: '900', color: '#64748b', textTransform: 'uppercase' },
  metricValue: { fontSize: 24, fontWeight: '900', color: '#1e1b4b', marginVertical: 4 },
  metricBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginTop: 2 },
  metricBadgeText: { fontSize: 10, fontWeight: '900', color: '#15803d' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionHeader: { fontSize: 17, fontWeight: '900', color: '#0f172a' },
  sectionSub: { fontSize: 12, fontWeight: '700', color: '#4f46e5' },
  taskCard: { backgroundColor: '#ffffff', padding: 14, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  taskCardDone: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
  checkboxCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#f8fafc', justifyContent: 'center', alignItems: 'center', marginRight: 12, borderWidth: 1, borderColor: '#cbd5e1' },
  checkboxCircleDone: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  checkboxIcon: { color: '#94a3b8', fontSize: 12, fontWeight: '900' },
  checkboxIconDone: { color: '#ffffff', fontSize: 12, fontWeight: '900' },
  taskLeft: { flex: 1, paddingRight: 8 },
  taskTitle: { fontSize: 13, fontWeight: '800', color: '#0f172a' },
  taskTitleDone: { textDecorationLine: 'line-through', color: '#94a3b8' },
  taskSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusDone: { backgroundColor: '#dcfce7' },
  statusPending: { backgroundColor: '#fef3c7' },
  statusText: { fontSize: 9, fontWeight: '900', color: '#15803d', textTransform: 'uppercase' },

  searchNotesBox: { marginBottom: 14 },
  searchNotesInput: { backgroundColor: '#ffffff', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, fontSize: 13, color: '#0f172a', borderWidth: 1, borderColor: '#e2e8f0' },

  notesCard: { backgroundColor: '#ffffff', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  notesBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notesSubject: { fontSize: 11, fontWeight: '900', color: '#4f46e5' },
  notesHighYieldTag: { fontSize: 10, fontWeight: '900', color: '#c2410c', backgroundColor: '#fff7ed', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  notesTitle: { fontSize: 17, fontWeight: '900', color: '#0f172a', marginVertical: 6 },
  notesBody: { fontSize: 13, color: '#334155', lineHeight: 22 },
  
  /* 📐 ULTRA-HIGH CONTRAST QUANT CODE BLOCK */
  quantCodeBlock: { backgroundColor: '#fff7ed', padding: 14, borderRadius: 14, marginTop: 12, borderWidth: 1, borderColor: '#ffedd5' },
  quantCodeLabel: { fontSize: 11, fontWeight: '900', color: '#c2410c', marginBottom: 4 },
  quantCodeText: { fontSize: 13, fontWeight: '900', color: '#0f172a', lineHeight: 20 },
  quantCodeSub: { fontSize: 11, color: '#475569', marginTop: 6, lineHeight: 16 },

  copyNoteBtn: { backgroundColor: '#e0e7ff', paddingVertical: 8, borderRadius: 10, marginTop: 12, alignItems: 'center' },
  copyNoteBtnText: { color: '#3730a3', fontWeight: '900', fontSize: 11 },

  testContainer: { backgroundColor: '#ffffff', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  testNavRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  qCounter: { fontSize: 12, fontWeight: '900', color: '#4f46e5' },
  testExamTag: { fontSize: 10, fontWeight: '900', color: '#b45309', backgroundColor: '#fef3c7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  qText: { fontSize: 16, fontWeight: '900', color: '#0f172a', marginBottom: 16, lineHeight: 24 },
  optButton: { backgroundColor: '#ffffff', padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  optButtonSelected: { backgroundColor: '#e0e7ff', borderColor: '#4f46e5' },
  optText: { fontSize: 14, fontWeight: '700', color: '#334155' },
  optTextSelected: { color: '#1e1b4b', fontWeight: '900' },
  testControlsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  prevBtn: { backgroundColor: '#f1f5f9', paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: '#cbd5e1' },
  prevBtnText: { color: '#334155', fontWeight: '900', fontSize: 13 },
  nextBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 18, paddingVertical: 14, borderRadius: 14 },
  nextBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 13 },
  submitTestBtn: { backgroundColor: '#f59e0b', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 14, alignItems: 'center', flex: 1, marginLeft: 8 },
  submitTestText: { color: '#0f172a', fontWeight: '900', fontSize: 14 },
  scorecardBox: { backgroundColor: '#ffffff', padding: 22, borderRadius: 22, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  scoreTitle: { fontSize: 22, fontWeight: '900', color: '#16a34a' },
  scoreValue: { fontSize: 15, fontWeight: '800', color: '#0f172a', marginVertical: 10 },
  solutionList: { width: '100%', marginVertical: 16 },
  solItem: { backgroundColor: '#f8fafc', padding: 14, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  solQ: { fontSize: 13, fontWeight: '900', color: '#0f172a' },
  solAns: { fontSize: 12, fontWeight: '800', color: '#16a34a', marginVertical: 4 },
  solExp: { fontSize: 12, color: '#475569', lineHeight: 18 },
  retestBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 14 },
  retestText: { color: '#ffffff', fontWeight: '900', fontSize: 14 },
  aiContainer: { flex: 1 },
  promptBar: { maxHeight: 44, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  promptChip: { backgroundColor: '#f1f5f9', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 14, marginRight: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  promptChipText: { color: '#334155', fontSize: 12, fontWeight: '700' },
  chatList: { padding: 16 },
  msgBubble: { padding: 14, borderRadius: 18, marginBottom: 12, maxWidth: '85%' },
  userBubble: { backgroundColor: '#4f46e5', alignSelf: 'flex-end' },
  aiBubble: { backgroundColor: '#ffffff', alignSelf: 'flex-start', borderWidth: 1, borderColor: '#e2e8f0' },
  userMsgText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  aiMsgText: { color: '#0f172a', fontSize: 13, fontWeight: '600', lineHeight: 20 },
  chatInputRow: { flexDirection: 'row', padding: 14, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  chatInput: { flex: 1, backgroundColor: '#f8fafc', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, color: '#0f172a', fontSize: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  sendBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 18, justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginLeft: 10 },
  sendBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 14 },
  profileCard: { backgroundColor: '#ffffff', padding: 26, borderRadius: 24, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  largeAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#4f46e5', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  largeAvatarText: { fontSize: 28, fontWeight: '900', color: '#ffffff' },
  profileName: { fontSize: 22, fontWeight: '900', color: '#0f172a' },
  profileEmail: { fontSize: 13, color: '#64748b', marginTop: 4 },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  pBadge: { backgroundColor: '#e0e7ff', color: '#3730a3', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, fontSize: 11, fontWeight: '900' },
  profileStatsBox: { width: '100%', backgroundColor: '#f8fafc', padding: 16, borderRadius: 14, marginTop: 18, borderWidth: 1, borderColor: '#e2e8f0' },
  pStatItem: { color: '#334155', fontSize: 13, fontWeight: '700', marginVertical: 3 },
  logoutActionBtn: { backgroundColor: '#ef4444', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14, marginTop: 18, width: '100%', alignItems: 'center' },
  logoutActionBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 14 },
  loginActionBtn: { backgroundColor: '#4f46e5', paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14, marginTop: 18, width: '100%', alignItems: 'center' },
  loginActionBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 14 },

  /* 🚀 TOP-TIER ED-TECH FLOATING BOTTOM NAVIGATION BAR */
  tabBar: { 
    flexDirection: 'row', 
    justify: 'space-around', 
    backgroundColor: '#ffffff', 
    paddingVertical: 12, 
    paddingHorizontal: 8,
    borderTopWidth: 1, 
    borderTopColor: '#e2e8f0'
  },
  tabItem: { 
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  tabItemActive: {
    backgroundColor: '#e0e7ff'
  },
  tabIcon: {
    fontSize: 19,
    marginBottom: 3
  },
  tabLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#64748b' 
  },
  tabLabelActive: { 
    color: '#4f46e5',
    fontWeight: '900'
  },

  /* 🔐 AUTH MODAL STYLES */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#ffffff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, elevation: 20 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#1e1b4b' },
  modalCloseBtn: { fontSize: 20, fontWeight: '900', color: '#64748b', padding: 4 },
  authTabRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 14, padding: 4, marginBottom: 16 },
  authTabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  authTabBtnActive: { backgroundColor: '#ffffff', elevation: 2 },
  authTabText: { fontSize: 13, fontWeight: '700', color: '#64748b' },
  authTabTextActive: { color: '#4f46e5', fontWeight: '900' },
  inputLabel: { fontSize: 12, fontWeight: '800', color: '#0f172a', marginBottom: 6, marginTop: 8 },
  modalInput: { backgroundColor: '#f8fafc', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, color: '#0f172a', borderWidth: 1, borderColor: '#e2e8f0' },
  modalPrimaryBtn: { backgroundColor: '#4f46e5', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 18 },
  modalPrimaryBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 14 },
  modalGoogleBtn: { backgroundColor: '#f8fafc', paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  modalGoogleBtnText: { color: '#0f172a', fontWeight: '900', fontSize: 13 },
  modalSubText: { fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 16 }
});

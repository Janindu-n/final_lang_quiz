//

var correctAnswersContainer = document.getElementById(
  "correct-answers--container"
);
var answers = document.getElementById("answers");
var currentSection = document.getElementById("current-section");
var nextSectionBtn = document.querySelector(".next-section");
correctAnswersContainer.style.display = "none";

function Solution() {
  answers.style.display = "block";
  correctAnswersContainer.innerHTML = "";
  quiz.questionsAsked.forEach((question) => {
    let html = `
    <li class="question">
      <span>${question.text}</span>
      <ul  style="margin-top:12px" class="choices">
    `;

    const choices = question.choices;
    const correctChoiceIndex = choices.findIndex(
      (choice) => choice === question.answer
    );

    choices.forEach((choice, index) => {
      const isCorrect = index === correctChoiceIndex;
      const style = isCorrect
        ? "background-color: #4CAF50;font-weight: bold; font-size:22px"
        : "font-size:22px";
      html += `<li  class="choice" style="${style}">${choice}</li>`;
    });

    html += `</ul></li><br />`;
    correctAnswersContainer.innerHTML += html;
  });
}
var scoreParent = document.getElementById("score");
var quizParent = document.getElementById("quiz");

function populate() {
  console.log("Current section: " + quiz.currentSectionIndex);
  currentSection.textContent =
    quiz.currentSectionMessage[quiz.currentSectionIndex];
  if (quiz.currentSectionIndex >= 7) {
    nextSectionBtn.style.display = "none";
  }
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question

    quizParent.style.display = "block";
    scoreParent.style.display = "none";
    answers.style.display = "none";
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " +
    currentQuestionNumber +
    " of " +
    quiz.totalQuestionsCountPerSection;
}

// function showScores() {
//   var gameOverHTML = "<h1>Result</h1>";
//   gameOverHTML +=
//     "<h2 id='score'> Your score: " + (quiz.score * 100) / 5 + "%</h2>";
//   var element = document.getElementById("quiz");
//   element.innerHTML = gameOverHTML;
// }

function showScores() {
  //7 is the number of sections... updated manually
  var totalQuestions = 7 * quiz.totalQuestionsCountPerSection; // Get the total number of questions
  var correctAnswers = quiz.score;
  console.log(
    "correct ans: " + correctAnswers + " total questions: " + totalQuestions
  );
  var scorePercentage = (correctAnswers / totalQuestions) * 100;

  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML +=
    "<h2 id='score'> Your score: " + scorePercentage.toFixed(2) + "%</h2>";

  // Add the "View Answers" button here
  // gameOverHTML +=
  //   "<div class='center'><a href='answers.html' class='button'>View Answers</a></div>";
  Solution();
  quizParent.style.display = "none";
  scoreParent.style.display = "block";
  correctAnswersContainer.style.display = "block";
  scoreParent.innerHTML = gameOverHTML;
}

var questionsSectionOne = [
  new Question(
    "1.Che cosa studia la pedagogia?",
    [
      "A. I processi cognitivi",
      "B. Le pratiche di insegnamento e apprendimento",
      "C. Gli aspetti psicologici che influenzano l’apprendimento",
      "D. Il progresso delle condizioni di vita",
    ],
    "B. Le pratiche di insegnamento e apprendimento"
  ),
  new Question(
    "2.Qual è l’obiettivo principale della pedagogia?",
    [
      "A. Comprendere i processi mentali degli studenti",
      "B. Sviluppare metodi e strategie efficaci per l’insegnamento",
      "C. Promuovere l’equità e l’uguaglianza",
      "D. Incrementare il benessere delle persone",
    ],
    "B. Sviluppare metodi e strategie efficaci per l’insegnamento"
  ),
  new Question(
    "3.Che cosa studia la psicopedagogia?",
    [
      "A. Le leggi e le regole sociali",
      "B. I processi cognitivi, emotivi e sociali che influenzano l’apprendimento",
      "C. Le pratiche di insegnamento e apprendimento",
      "D. Le opportunità economiche",
    ],
    "B. I processi cognitivi, emotivi e sociali che influenzano l’apprendimento"
  ),
  new Question(
    "4.Qual è l’obiettivo principale della psicopedagogia?",
    [
      "A. Promuovere la crescita umana",
      "B. Comprendere i processi mentali degli studenti per migliorare l’educazione",
      "C. Elevare il livello di vita delle persone",
      "D. Costruire comunità più stabili e sostenibili",
    ],
    "B. Comprendere i processi mentali degli studenti per migliorare l’educazione"
  ),
  new Question(
    "5.Qual è una differenza principale tra pedagogia e psicopedagogia?",
    [
      "A. La pedagogia si concentra sui metodi di insegnamento, mentre la psicopedagogia si concentra sugli aspetti psicologici che influenzano l’apprendimento",
      "B. La pedagogia si concentra sullo sviluppo sociale, mentre la psicopedagogia si concentra sulle relazioni di gruppo",
      "C. La pedagogia si concentra sulle opportunità economiche, mentre la psicopedagogia si concentra sulle condizioni di alloggio",
      "D. La pedagogia si concentra sulle risorse naturali e ambientali, mentre la psicopedagogia si concentra sul benessere delle persone",
    ],
    "A. La pedagogia si concentra sui metodi di insegnamento, mentre la psicopedagogia si concentra sugli aspetti psicologici che influenzano l’apprendimento"
  ),
  new Question(
    "6.Che cosa coinvolge il concetto di sviluppo sociale?",
    [
      "A. L’incremento del benessere e del livello di vita di una comunità",
      "B. Lo sviluppo di metodi e strategie efficaci per l’insegnamento",
      "C. La comprensione dei processi mentali degli studenti",
      "D. La creazione di materiali didattici interessanti e stimolanti",
    ],
    "A. L’incremento del benessere e del livello di vita di una comunità"
  ),
  new Question(
    "7.Perché è importante lo sviluppo sociale?",
    [
      "A. Perché promuove l’equità e l’uguaglianza, eleva il livello di vita, promuove la crescita umana e la sostenibilità",
      "B. Perché contribuisce a creare stress e ansia negli studenti",
      "C. Perché aiuta a sviluppare metodi e strategie efficaci per l’insegnamento",
      "D. Perché permette di avere un quadro chiaro e oggettivo delle competenze acquisite dagli studenti",
    ],
    "A. Perché promuove l’equità e l’uguaglianza, eleva il livello di vita, promuove la crescita umana e la sostenibilità"
  ),
  new Question(
    "8.Qual è uno degli scopi principali dello sviluppo sociale?",
    [
      "A. Promuovere l’equità e l’uguaglianza delle opportunità per tutti gli individui della comunità",
      "B. Fornire feedback tempestivi per favorire il miglioramento",
      "C. Identificare punti di forza e aree di miglioramento nelle scuole",
      "D. Sviluppare la consapevolezza delle proprie competenze",
    ],
    "A. Promuovere l’equità e l’uguaglianza delle opportunità per tutti gli individui della comunità"
  ),
  new Question(
    "9.Come contribuisce lo sviluppo sociale allo sviluppo sostenibile?",
    [
      "A. Promuovendo il benessere sociale, contribuisce a costruire comunità più stabili e sostenibili",
      "B. Introducendo una valutazione formativa continua",
      "C. Concentrandosi sugli aspetti psicologici che influenzano l’apprendimento",
      "D. Sviluppando metodi e strategie efficaci per l’insegnamento",
    ],
    "A. Promuovendo il benessere sociale, contribuisce a costruire comunità più stabili e sostenibili"
  ),
  new Question(
    "10.Che cosa rappresenta la crescita umana nel contesto dello sviluppo sociale?",
    [
      "A. L’istruzione, la salute, l’accesso ai servizi sociali, l’uguaglianza di genere e il rispetto dei diritti umani",
      "B. La valutazione standardizzata delle competenze degli studenti",
      "C. La focalizzazione eccessiva sui risultati dei test",
      "D. Il coinvolgimento degli studenti nel processo di valutazione.",
    ],
    "A. L’istruzione, la salute, l’accesso ai servizi sociali, l’uguaglianza di genere e il rispetto dei diritti umani"
  ),
  new Question(
    "11.Cosa si intende per dinamiche di gruppo?",
    [
      "A) Il comportamento individuale all’interno di un gruppo",
      "B) L’insieme di interazioni e processi che si verificano all’interno di un gruppo",
      "C) Il processo decisionale all’interno di un gruppo",
      "D) La leadership all’interno di un gruppo",
    ],
    "B) L’insieme di interazioni e processi che si verificano all’interno di un gruppo"
  ),
  new Question(
    "12.Che cosa è l’autoefficacia secondo Bandura?",
    [
      "A) La capacità di un individuo di influenzare gli altri",
      "B) La capacità di un individuo di adattarsi a nuove situazioni",
      "C) La credenza di un individuo nella propria capacità di compiere azioni e raggiungere obiettivi",
      "D) La capacità di un individuo di lavorare in gruppo",
    ],
    "C) La credenza di un individuo nella propria capacità di compiere azioni e raggiungere obiettivi"
  ),
  new Question(
    "13.Qual è la fase finale dello sviluppo psicosociale secondo Erikson?",
    [
      "A) Intimità vs isolamento",
      "B) Generatività vs stagnazione",
      "C) Identità vs confusione di ruolo",
      "D) Integrità dell’io vs disperazione",
    ],
    "D) Integrità dell’io vs disperazione"
  ),
  new Question(
    "14.Cosa significa “permanenza dell’oggetto” nel contesto dello sviluppo cognitivo?",
    [
      "A) La capacità di ricordare gli oggetti anche quando non sono presenti",
      "B) La capacità di riconoscere gli oggetti in diversi contesti",
      "C) La consapevolezza che gli oggetti esistono anche quando non sono in vista",
      "D) La capacità di manipolare oggetti mentalmente",
    ],
    "C) La consapevolezza che gli oggetti esistono anche quando non sono in vista"
  ),
  new Question(
    "15.Secondo Vygotsky, cosa è la “zona di sviluppo prossimale”?",
    [
      "A) La distanza tra ciò che un bambino può fare da solo e ciò che può fare con l’aiuto di un adulto o di un coetaneo più esperto",
      "B) La fase in cui un bambino inizia a sviluppare la capacità di pensare in modo astratto",
      "C) La fase in cui un bambino inizia a sviluppare la capacità di risolvere problemi in modo autonomo",
      "D) La fase in cui un bambino inizia a sviluppare la capacità di comprendere il punto di vista degli altri",
    ],
    "A) La distanza tra ciò che un bambino può fare da solo e ciò che può fare con l’aiuto di un adulto o di un coetaneo più esperto"
  ),
  new Question(
    "16.Cosa influisce maggiormente sullo sviluppo cognitivo secondo la teoria socioculturale di Vygotsky?",
    [
      "A) Interazioni sociali e culturali",
      "B) Esperienze dirette con l’ambiente fisico",
      "C) Genetica e predisposizione biologica",
      "D) Capacità di memoria e attenzione",
    ],
    "A) Interazioni sociali e culturali"
  ),
  new Question(
    "17.Qual è il ruolo delle figure genitoriali secondo la teoria dell’attaccamento di Bowlby?",
    [
      "A) Fornire supporto emotivo e sicurezza",
      "B) Insegnare abilità sociali e comportamenti appropriati",
      "C) Fornire stimoli cognitivi e opportunità di apprendimento",
      "D) Insegnare abilità motorie e coordinazione",
    ],
    "A) Fornire supporto emotivo e sicurezza"
  ),
  new Question(
    "18.Qual è la principale differenza tra le teorie dello sviluppo cognitivo di Piaget e Vygotsky?",
    [
      "A) Piaget enfatizza lo sviluppo individuale e le interazioni con l’ambiente fisico, mentre Vygotsky enfatizza le interazioni sociali e culturali",
      "B) Piaget enfatizza le interazioni sociali e culturali, mentre Vygotsky enfatizza lo sviluppo individuale e le interazioni con l’ambiente fisico",
      "C) Piaget enfatizza lo sviluppo emotivo, mentre Vygotsky enfatizza lo sviluppo cognitivo",
      "D) Piaget enfatizza lo sviluppo delle abilità motorie, mentre Vygotsky enfatizza lo sviluppo delle abilità sociali",
    ],
    "A) Piaget enfatizza lo sviluppo individuale e le interazioni con l’ambiente fisico, mentre Vygotsky enfatizza le interazioni sociali e culturali"
  ),
  new Question(
    "19.Secondo Piaget, in quale fase dello sviluppo cognitivo i bambini iniziano a pensare logicamente?",
    [
      "A) Stadio Sensorio-Motorio",
      "B) Stadio Preoperazionale",
      "C) Stadio delle Operazioni Concreto",
      "D) Stadio delle Operazioni Formali",
    ],
    "C) Stadio delle Operazioni Concreto"
  ),
  new Question(
    "20.Cosa si intende per “conservazione” nella teoria dello sviluppo cognitivo di Piaget?",
    [
      "A) La capacità di mantenere informazioni nella memoria a lungo termine",
      "B) La comprensione che certe proprietà degli oggetti rimangono invariate nonostante le modifiche superficiali",
      "C) La capacità di trasferire informazioni dalla memoria a breve termine alla memoria a lungo termine",
      "D) La capacità di conservare energia mentale durante compiti cognitivi complessi",
    ],
    "B) La comprensione che certe proprietà degli oggetti rimangono invariate nonostante le modifiche superficiali"
  ),
  new Question(
    "21.Cosa significa “individuazione-separazione” nella teoria dell’attaccamento di Bowlby?",
    [
      "A) Il processo attraverso il quale i bambini sviluppano un senso di identità e autonomia",
      "B) Il processo attraverso il quale i bambini sviluppano una forte dipendenza dagli adulti",
      "C) Il processo attraverso il quale i bambini riconoscono e distinguono gli oggetti",
      "D) Il processo attraverso il quale i bambini iniziano a sviluppare abilità motorie",
    ],
    "C) Il processo attraverso il quale i bambini riconoscono e distinguono gli oggetti"
  ),
  new Question(
    "22.Cosa significa “ansia di separazione” secondo la teoria dell’attaccamento di Bowlby?",
    [
      "A) L’ansia che i genitori provano quando si separano dai loro figli",
      "B) L’ansia che i bambini provano quando sono separati dalle loro figure di attaccamento",
      "C) L’ansia che i bambini provano quando interagiscono con i loro coetanei",
      "D) L’ansia che i bambini provano durante l’adolescenza",
    ],
    "B) L’ansia che i bambini provano quando sono separati dalle loro figure di attaccamento"
  ),
  new Question(
    "23.Cosa significa “internalizzazione” nella teoria dello sviluppo morale di Kohlberg?",
    [
      "A) Il processo attraverso il quale le norme sociali diventano parte del pensiero e del comportamento di un individuo",
      "B) Il processo attraverso il quale un individuo diventa consapevole dei propri sentimenti e emozioni",
      "C) Il processo attraverso il quale un individuo sviluppa una forte dipendenza dagli altri",
      "D) Il processo attraverso il quale un individuo acquisisce competenze sociali",
    ],
    "A) Il processo attraverso il quale le norme sociali diventano parte del pensiero e del comportamento di un individuo"
  ),
  new Question(
    "24.Cosa rappresenta il “postconvenzionalismo” nella teoria dello sviluppo morale di Kohlberg?",
    [
      "A) La fase in cui i bambini seguono le regole solo per evitare punizioni",
      "B) La fase in cui gli individui agiscono in base a principi etici universali anche se contraddicono le leggi",
      "C) La fase in cui i bambini imparano a seguire le regole attraverso ricompense e punizioni",
      "D) La fase in cui gli individui seguono le leggi solo per ottenere benefici personali",
    ],
    "B) La fase in cui gli individui agiscono in base a principi etici universali anche se contraddicono le leggi"
  ),
  new Question(
    "25.Qual è l’obiettivo principale della teoria dell’attaccamento di Bowlby?",
    [
      "A) Spiegare come gli individui sviluppano abilità motorie",
      "B) Spiegare come gli individui sviluppano le loro competenze sociali",
      "C) Spiegare come gli individui sviluppano legami emotivi con le figure di attaccamento",
      "D) Spiegare come gli individui sviluppano il linguaggio",
    ],
    "C) Spiegare come gli individui sviluppano legami emotivi con le figure di attaccamento"
  ),
  new Question(
    "26.Che cos'è la sindrome di Down?",
    [
      "A) Una malattia cardiovascolare",
      "B) Una malattia del sistema nervoso",
      "C) Una condizione genetica caratterizzata da un cromosoma extra",
      "D) Una malattia autoimmune",
    ],
    "C) Una condizione genetica caratterizzata da un cromosoma extra"
  ),
  new Question(
    "27.Quale delle seguenti affermazioni sullo sviluppo motorio dei bambini è vera?",
    [
      "A) I bambini sviluppano abilità motorie nello stesso modo e alla stessa età",
      "B) I bambini sviluppano abilità motorie solo attraverso l'istruzione formale",
      "C) Lo sviluppo motorio dei bambini segue una sequenza prevedibile, ma il ritmo varia da individuo a individuo",
      "D) I bambini non sviluppano abilità motorie fino all'adolescenza",
    ],
    "C) Lo sviluppo motorio dei bambini segue una sequenza prevedibile, ma il ritmo varia da individuo a individuo"
  ),
  new Question(
    "28.Qual è l'importanza dello sviluppo motorio nei bambini?",
    [
      "A) Lo sviluppo motorio non ha alcuna importanza per i bambini",
      "B) Lo sviluppo motorio è importante solo per i bambini che praticano sport",
      "C) Lo sviluppo motorio è fondamentale per l'apprendimento e l'interazione sociale dei bambini",
      "D) Lo sviluppo motorio è importante solo per i bambini con disabilità",
    ],
    "C) Lo sviluppo motorio è fondamentale per l'apprendimento e l'interazione sociale dei bambini"
  ),
  new Question(
    "29.Qual è uno dei principali fattori che influenzano lo sviluppo cognitivo nei bambini?",
    [
      "A) La genetica",
      "B) Il sesso",
      "C) L'età dei genitori",
      "D) Il reddito familiare",
    ],
    "A) La genetica"
  ),
  new Question(
    "30.Che tipo di apprendimento è favorito dalla teoria dell'apprendimento sociale di Bandura?",
    [
      "A) Apprendimento basato sulle risposte condizionate",
      "B) Apprendimento basato sulla riflessione individuale",
      "C) Apprendimento basato sull'osservazione e sull'imitazione degli altri",
      "D) Apprendimento basato sulla punizione e sulle ricompense",
    ],
    "C) Apprendimento basato sull'osservazione e sull'imitazione degli altri"
  ),
  new Question(
    "31.Cosa rappresenta il concetto di “sviluppo psicosociale”?",
    [
      "A) Lo sviluppo delle abilità motorie e fisiche",
      "B) Lo sviluppo delle relazioni sociali e delle competenze emotive",
      "C) Lo sviluppo delle competenze matematiche e scientifiche",
      "D) Lo sviluppo delle abilità linguistiche",
    ],
    "B) Lo sviluppo delle relazioni sociali e delle competenze emotive"
  ),
  new Question(
    "32.Che cosa significa “socializzazione” nel contesto dello sviluppo psicosociale?",
    [
      "A) Il processo attraverso il quale gli individui imparano a interagire con il mondo fisico",
      "B) Il processo attraverso il quale gli individui imparano a comportarsi in modo appropriato all'interno della loro cultura e società",
      "C) Il processo attraverso il quale gli individui imparano a lavorare in gruppo",
      "D) Il processo attraverso il quale gli individui sviluppano abilità motorie",
    ],
    "B) Il processo attraverso il quale gli individui imparano a comportarsi in modo appropriato all'interno della loro cultura e società"
  ),
  new Question(
    "33.Qual è il ruolo delle norme sociali nello sviluppo psicosociale?",
    [
      "A) Le norme sociali non hanno alcun ruolo nello sviluppo psicosociale",
      "B) Le norme sociali influenzano solo l'età degli individui",
      "C) Le norme sociali guidano il comportamento e le interazioni degli individui all'interno della loro cultura e società",
      "D) Le norme sociali influenzano solo il comportamento degli adulti",
    ],
    "C) Le norme sociali guidano il comportamento e le interazioni degli individui all'interno della loro cultura e società"
  ),
  new Question(
    "34.Che cosa rappresenta la teoria dell'attaccamento di Bowlby?",
    [
      "A) Una teoria sull'attaccamento degli adulti alle loro figure di riferimento",
      "B) Una teoria sullo sviluppo del linguaggio nei bambini",
      "C) Una teoria sull'importanza dell'attività fisica nell'infanzia",
      "D) Una teoria sull'attaccamento dei bambini alle loro figure di attaccamento",
    ],
    "D) Una teoria sull'attaccamento dei bambini alle loro figure di attaccamento"
  ),
  new Question(
    "35.Cosa rappresenta il concetto di “zona di sviluppo prossimale” secondo Vygotsky?",
    [
      "A) La distanza tra il passato e il futuro sviluppo cognitivo di un individuo",
      "B) La distanza tra ciò che un bambino può fare da solo e ciò che può fare con l'aiuto di un adulto o di un coetaneo più esperto",
      "C) La distanza tra la casa e la scuola in cui avviene l'apprendimento",
      "D) La distanza tra il proprio paese e un paese straniero in cui avviene l'apprendimento",
    ],
    "B) La distanza tra ciò che un bambino può fare da solo e ciò che può fare con l'aiuto di un adulto o di un coetaneo più esperto"
  ),
];

var questionsSectionTwo = [
  new Question(
    "1.Qual è il principale vantaggio dell’educazione digitale rispetto all’educazione tradizionale?",
    [
      "A. Accesso alla tecnologia",
      "B. Interazioni dirette",
      "C. Personalizzazione dell’insegnamento",
      "D. Ambiente strutturato",
    ],
    "C. Personalizzazione dell’insegnamento"
  ),
  new Question(
    "2.Qual è una delle principali sfide dell’apprendimento online?",
    [
      "A. Accesso a dispositivi digitali e connessione internet affidabile",
      "B. Favorire lo sviluppo del pensiero critico",
      "C. Facilitare la comunicazione e il lavoro di gruppo",
      "D. Mantenere un ambiente strutturato",
    ],
    "A. Accesso a dispositivi digitali e connessione internet affidabile"
  ),
  new Question(
    "3.Qual è uno dei vantaggi principali dell’approccio costruttivista?",
    [
      "A. Facilità di implementazione e valutazione",
      "B. Controllo e modifica del comportamento attraverso il condizionamento",
      "C. Sviluppo del pensiero critico e delle competenze di problem solving",
      "D. Uso di premi e punizioni per incentivare comportamenti specifici",
    ],
    "C. Sviluppo del pensiero critico e delle competenze di problem solving"
  ),
  new Question(
    "4.Qual è uno dei problemi principali legati all’approccio comportamentale?",
    [
      "A. Complessità nell’implementazione e nella valutazione",
      "B. Ignora le differenze individuali tra gli studenti",
      "C. Necessità di una preparazione e flessibilità maggiore da parte dell’insegnante",
      "D. Incoraggia lo sviluppo del pensiero critico",
    ],
    "B. Ignora le differenze individuali tra gli studenti"
  ),
  new Question(
    "5.Quale è un beneficio fondamentale del metodo socratico?",
    [
      "A. Consente di trasferire una grande quantità di informazioni in breve tempo",
      "B. Incoraggia il pensiero critico e il dialogo",
      "C. Rende più facile per gli studenti assimilare le informazioni",
      "D. Favorisce l’apprendimento pratico e la risoluzione dei problemi",
    ],
    "B. Incoraggia il pensiero critico e il dialogo"
  ),
  new Question(
    "6.Qual è un inconveniente rilevante dell’educazione mista?",
    [
      "A. Necessità di dispositivi digitali e connessione internet stabile",
      "B. Non stimola lo sviluppo delle abilità di problem solving",
      "C. Può essere complesso da organizzare e richiede una pianificazione accurata",
      "D. Non incoraggia l’interazione diretta tra gli studenti",
    ],
    "C. Può essere complesso da organizzare e richiede una pianificazione accurata"
  ),
  new Question(
    "7.Quale delle seguenti affermazioni è falsa riguardo l’uso delle Lavagne Interattive Multimediali (LIM) nell’insegnamento?",
    [
      "A. Le LIM rendono l’apprendimento più interattivo e coinvolgente.",
      "B. Le LIM possono essere utilizzate solo per le lezioni di informatica.",
      "C. L’uso di LIM può aiutare a presentare informazioni in modo visivo.",
      "D. Le LIM possono essere utilizzate in combinazione con altre metodologie e attività.",
    ],
    "B. Le LIM possono essere utilizzate solo per le lezioni di informatica."
  ),
  new Question(
    "8.Quale delle seguenti affermazioni è vera riguardo il CLIL (Content and Language Integrated Learning)?",
    [
      "A. CLIL è un metodo che promuove solo l’apprendimento della lingua straniera, ignorando i contenuti disciplinari.",
      "B. CLIL facilita l’integrazione delle competenze linguistiche in altre aree del curriculum.",
      "C. CLIL richiede l’uso esclusivo di materiali didattici tradizionali, come libri di testo e quaderni.",
      "D. CLIL è un metodo inefficace per gli studenti che non hanno una buona conoscenza della lingua straniera.",
    ],
    "B. CLIL facilita l’integrazione delle competenze linguistiche in altre aree del curriculum."
  ),
  new Question(
    "9.Qual è un elemento chiave per un’implementazione efficace del metodo CLIL?",
    [
      "A. Ignorare le differenze individuali tra gli studenti.",
      "B. Fornire feedback solo alla fine del corso.",
      "C. Utilizzare esclusivamente materiali didattici in lingua straniera.",
      "D. Adattare l’insegnamento ai bisogni e agli interessi degli studenti.",
    ],
    "D. Adattare l’insegnamento ai bisogni e agli interessi degli studenti."
  ),
  new Question(
    "10.Qual è uno dei modi in cui le tecnologie dell’informazione possono migliorare l’efficacia dell’insegnamento?",
    [
      "A. Fornendo materiali di apprendimento interattivi",
      "B. Limitando la comunicazione tra insegnanti e studenti",
      "C. Riducendo la necessità di pianificazione da parte dell’insegnante",
      "D. Promuovendo l’apprendimento passivo",
    ],
    "A. Fornendo materiali di apprendimento interattivi"
  ),
  new Question(
    "11.Qual è uno degli svantaggi dell’uso delle Lavagne Interattive Multimediali (LIM)?",
    [
      "A. Promuovono l’apprendimento passivo",
      "B. Richiedono l’accesso a dispositivi digitali e una connessione internet affidabile",
      "C. Rendono l’apprendimento meno autentico e significativo",
      "D. Possono essere difficili da integrare in modo efficace nell’organizzazione delle lezioni",
    ],
    "D. Possono essere difficili da integrare in modo efficace nell’organizzazione delle lezioni"
  ),
  new Question(
    "12.Qual è un suggerimento per un’implementazione efficace del CLIL?",
    [
      "A. Utilizzare esclusivamente metodi e materiali tradizionali",
      "B. Adattare l’insegnamento ai bisogni e agli interessi degli studenti",
      "C. Evitare l’uso di materiali visivi e interattivi",
      "D. Fornire feedback solo alla fine del corso",
    ],
    "B. Adattare l’insegnamento ai bisogni e agli interessi degli studenti"
  ),
  new Question(
    "13.Come può la flipped classroom essere positiva per l’istruzione?",
    [
      "A. Riduce il carico di lavoro di preparazione per l’insegnante",
      "B. Favorisce l’assorbimento non attivo delle informazioni",
      "C. Crea più spazio durante le lezioni per attività collaborative e interattive",
      "D. Riduce la necessità di dispositivi digitali e connessione internet affidabile",
    ],
    "C. Crea più spazio durante le lezioni per attività collaborative e interattive"
  ),
  new Question(
    "14.Qual è uno degli svantaggi dell’uso del metodo tradizionale di insegnamento diretto?",
    [
      "A. Promuove la comunicazione e la collaborazione",
      "B. Non tiene conto delle differenze individuali degli studenti",
      "C. Richiede una maggiore preparazione e flessibilità da parte dell’insegnante",
      "D. Incentiva lo sviluppo di competenze di problem solving",
    ],
    "B. Non tiene conto delle differenze individuali degli studenti"
  ),
  new Question(
    "15.Qual è una delle ragioni principali per cui è importante valutare le competenze non cognitive degli studenti?",
    [
      "A. Permette di classificare gli studenti in base alle loro prestazioni",
      "B. Promuove la competitività tra gli studenti",
      "C. Favorisce lo sviluppo delle competenze sociali ed emotive",
      "D. Incoraggia la memorizzazione di fatti e informazioni",
    ],
    "C. Favorisce lo sviluppo delle competenze sociali ed emotive"
  ),
  new Question(
    "16.In che modo l’educazione digitale può essere adattata alle esigenze individuali degli studenti?",
    [
      "A. Ignorando le esigenze degli studenti",
      "B. Fornendo lo stesso materiale a tutti",
      "C. Adattando le risorse e le attività al livello di ciascuno",
      "D. Limitando l’accesso alle risorse digitali",
    ],
    "C. Adattando le risorse e le attività al livello di ciascuno"
  ),
  new Question(
    "17.Come può l’apprendimento collaborativo incrementare la motivazione degli studenti?",
    [
      "A. Riducendo la loro partecipazione",
      "B. Promuovendo la competizione individuale",
      "C. Aumentando l’interazione e il coinvolgimento",
      "D. Limitando la condivisione delle idee",
    ],
    "C. Aumentando l’interazione e il coinvolgimento"
  ),
  new Question(
    "18.Perché è importante l’autovalutazione per lo sviluppo delle competenze degli studenti?",
    [
      "A. Permette agli insegnanti di controllare gli studenti",
      "B. Sviluppa la consapevolezza e la responsabilità",
      "C. Riduce la necessità di feedback esterni",
      "D. Incoraggia la dipendenza dalle valutazioni degli altri",
    ],
    "B. Sviluppa la consapevolezza e la responsabilità"
  ),
  new Question(
    "19.Qual è il beneficio principale dell’approccio costruttivista?",
    [
      "A. Facilita la memorizzazione delle informazioni",
      "B. Promuove la dipendenza dall’insegnante",
      "C. Sviluppa il pensiero critico e l’autoapprendimento",
      "D. Riduce la necessità di riflessione e analisi",
    ],
    "C. Sviluppa il pensiero critico e l’autoapprendimento"
  ),
  new Question(
    "20.Qual è una delle principali critiche all’approccio comportamentista?",
    [
      "A. Promuove troppo l’indipendenza degli studenti",
      "B. Non tiene conto delle differenze individuali",
      "C. Richiede troppa preparazione da parte dell’insegnante",
      "D. Stimola eccessivamente il pensiero critico",
    ],
    "B. Non tiene conto delle differenze individuali"
  ),
  new Question(
    "21.Perché il metodo socratico è efficace nello sviluppo del pensiero critico?",
    [
      "A. Promuove l’assorbimento passivo delle informazioni",
      "B. Stimola il dialogo e l’analisi critica",
      "C. Encourages rote memorization of facts",
      "D. Promuove la conformità e l’accettazione delle idee altrui",
    ],
    "B. Stimola il dialogo e l’analisi critica"
  ),
  new Question(
    "22.Qual è una delle principali sfide dell’apprendimento ibrido?",
    [
      "A. Facilita l’organizzazione e la pianificazione",
      "B. Non favorisce lo sviluppo delle competenze sociali",
      "C. Richiede l’accesso a dispositivi e internet affidabili",
      "D. Promuove l’interazione faccia a faccia",
    ],
    "C. Richiede l’accesso a dispositivi e internet affidabili"
  ),
  new Question(
    "23.Qual è il principale vantaggio del CLIL?",
    [
      "A. Riduce la necessità di preparazione da parte dell’insegnante",
      "B. Promuove l’assimilazione passiva delle informazioni",
      "C. Favorisce l’apprendimento sia dei contenuti disciplinari che della lingua",
      "D. Limita la necessità di risorse visive e interattive",
    ],
    "C. Favorisce l’apprendimento sia dei contenuti disciplinari che della lingua"
  ),
  new Question(
    "24.Qual è un aspetto cruciale nella pianificazione di una lezione efficace?",
    [
      "A. Evitare l’uso di feedback costruttivi",
      "B. Definizione chiara degli obiettivi di apprendimento",
      "C. Uso esclusivo di tecnologie digitali",
      "D. Limitare l’uso di metodologie interattive",
    ],
    "B. Definizione chiara degli obiettivi di apprendimento"
  ),
  new Question(
    "25.Come le tecnologie dell’informazione possono migliorare l’insegnamento?",
    [
      "A. Promuovendo l’apprendimento passivo",
      "B. Fornendo materiali di apprendimento interattivi",
      "C. Riducendo la comunicazione tra insegnanti e studenti",
      "D. Limitando la necessità di preparazione dell’insegnante",
    ],
    "B. Fornendo materiali di apprendimento interattivi"
  ),
  new Question(
    "26.Qual è uno svantaggio dell’uso delle Lavagne Interattive Multimediali (LIM)?",
    [
      "A. Rendono l’apprendimento meno autentico",
      "B. Promuovono la collaborazione e l’interazione",
      "C. Richiedono dispositivi digitali e connessione internet",
      "D. Facilitano l’organizzazione delle lezioni",
    ],
    "A. Rendono l’apprendimento meno autentico"
  ),
  new Question(
    "27.Qual è un consiglio per un’implementazione efficace del CLIL?",
    [
      "A. Evitare l’uso di materiali visivi e interattivi",
      "B. Adattare l’insegnamento ai bisogni e agli interessi degli studenti",
      "C. Utilizzare solo metodi e materiali tradizionali",
      "D. Fornire feedback solo alla fine del corso",
    ],
    "B. Adattare l’insegnamento ai bisogni e agli interessi degli studenti"
  ),
  new Question(
    "28.Qual è un vantaggio dell’apprendimento invertito o flipped classroom?",
    [
      "A. Promuove l’assimilazione passiva delle informazioni",
      "B. Riduce la necessità di accesso a dispositivi digitali",
      "C. Libera tempo in classe per attività interattive e collaborative",
      "D. Richiede meno preparazione da parte dell’insegnante",
    ],
    "C. Libera tempo in classe per attività interattive e collaborative"
  ),
  new Question(
    "29.Perché è importante valutare le competenze non cognitive degli studenti?",
    [
      "A. Incoraggia la memorizzazione di fatti e informazioni",
      "B. Promuove la competizione tra gli studenti",
      "C. Favorisce lo sviluppo delle competenze sociali ed emotive",
      "D. Permette di classificare gli studenti in base alle loro prestazioni",
    ],
    "C. Favorisce lo sviluppo delle competenze sociali ed emotive"
  ),
  new Question(
    "30.Quale dei seguenti NON è un vantaggio del metodo CLIL?",
    [
      "A. Rende l’apprendimento più autentico e significativo.",
      "B. Promuove l’apprendimento sia dei contenuti disciplinari che della lingua straniera.",
      "C. Rende l’apprendimento della lingua straniera meno importante rispetto ai contenuti disciplinari.",
      "D. Facilita l’integrazione delle competenze linguistiche in altre aree del curriculum.",
    ],
    "C. Rende l’apprendimento della lingua straniera meno importante rispetto ai contenuti disciplinari."
  ),
];

var questionsSectionThree = [
  new Question(
    "1. Che cos’è l’inclusività nella scuola?",
    [
      "A. Escludere gli studenti con bisogni speciali.",
      "B. Rispondere alla diversità dei bisogni di tutti gli studenti.",
      "C. Concentrarsi solo sulle esigenze degli studenti senza bisogni speciali.",
      "D. Separare gli studenti in base alle loro capacità e bisogni.",
    ],
    "B. Rispondere alla diversità dei bisogni di tutti gli studenti."
  ),
  new Question(
    "2. Qual è uno dei benefici dell’inclusività nella scuola?",
    [
      "A. Promuove la competizione tra gli studenti.",
      "B. Incoraggia la tolleranza e il rispetto per le differenze.",
      "C. Favorisce la separazione tra gli studenti con e senza bisogni speciali.",
      "D. Crea un ambiente di apprendimento stressante.",
    ],
    "B. Incoraggia la tolleranza e il rispetto per le differenze."
  ),
  new Question(
    "3. Qual è stata una legge importante per l’inclusività in Italia?",
    [
      "A. Legge 104/1992",
      "B. Legge 123/1989",
      "C. Legge 150/2001",
      "D. Legge 200/2005",
    ],
    "A. Legge 104/1992"
  ),
  new Question(
    "4. Cosa ha riconosciuto la Legge 170/2010?",
    [
      "A. I diritti delle persone anziane.",
      "B. I Disturbi Specifici dell’Apprendimento (DSA).",
      "C. I diritti degli immigrati.",
      "D. Le esigenze degli studenti senza bisogni speciali.",
    ],
    "B. I Disturbi Specifici dell’Apprendimento (DSA)."
  ),
  new Question(
    "5. Che cosa è fondamentale in un contesto scolastico inclusivo?",
    [
      "A. Ignorare gli studenti con bisogni speciali.",
      "B. Costruire relazioni positive con tutti gli studenti.",
      "C. Fornire supporto solo agli studenti senza bisogni speciali.",
      "D. Concentrarsi solo sull’accademico e non sul benessere degli studenti.",
    ],
    "B. Costruire relazioni positive con tutti gli studenti."
  ),
  new Question(
    "6. Cosa significa ascoltare attivamente gli studenti?",
    [
      "A. Ignorare ciò che dicono gli studenti.",
      "B. Prestare completa attenzione a ciò che dicono senza interruzioni.",
      "C. Ascoltare solo gli studenti senza bisogni speciali.",
      "D. Interrompere gli studenti mentre parlano.",
    ],
    "B. Prestare completa attenzione a ciò che dicono senza interruzioni."
  ),
  new Question(
    "7. Quale competenza è necessaria per realizzare una scuola inclusiva?",
    [
      "A. Rifiuto di adattarsi.",
      "B. Empatia.",
      "C. Intransigenza.",
      "D. Comunicazione inefficace.",
    ],
    "B. Empatia."
  ),
  new Question(
    "8. Cosa promuove la Legge 107/2015 (La Buona Scuola)?",
    [
      "A. La separazione tra studenti con e senza bisogni speciali.",
      "B. L’esclusione degli studenti con bisogni educativi speciali.",
      "C. Il sostegno ai docenti e agli studenti con bisogni educativi speciali.",
      "D. L’ignoranza delle esigenze degli studenti con bisogni speciali.",
    ],
    "C. Il sostegno ai docenti e agli studenti con bisogni educativi speciali."
  ),
  new Question(
    "9. Qual è l’obiettivo dell’inclusività nella scuola?",
    [
      "A. Creare un ambiente di apprendimento ingiusto.",
      "B. Favorire la solidarietà e il sostegno reciproco tra gli studenti.",
      "C. Promuovere un atteggiamento chiuso e intollerante.",
      "D. Incoraggiare la competizione tra gli studenti.",
    ],
    "B. Favorire la solidarietà e il sostegno reciproco tra gli studenti."
  ),
  new Question(
    "10. Cosa significa fornire un supporto positivo e incoraggiante?",
    [
      "A. Criticare gli studenti per ogni errore.",
      "B. Elogiare gli sforzi degli studenti anche se non hanno raggiunto completamente un obiettivo.",
      "C. Fornire solo feedback negativo.",
      "D. Ignorare gli sforzi degli studenti.",
    ],
    "B. Elogiare gli sforzi degli studenti anche se non hanno raggiunto completamente un obiettivo."
  ),
  new Question(
    "11. Perché è importante mostrare empatia agli studenti?",
    [
      "A. Per creare un ambiente di diffidenza.",
      "B. Per aiutare a creare un ambiente di fiducia e supporto.",
      "C. Per promuovere un atteggiamento di indifferenza.",
      "D. Per incoraggiare gli studenti a non condividere i loro sentimenti.",
    ],
    "B. Per aiutare a creare un ambiente di fiducia e supporto."
  ),
  new Question(
    "12. Perché è importante adattare l’insegnamento alle diverse esigenze degli studenti?",
    [
      "A. Per promuovere l’ingiustizia.",
      "B. Per favorire la competizione tra gli studenti.",
      "C. Per aiutare tutti gli studenti a avere le stesse opportunità di successo.",
      "D. Per ignorare le esigenze degli studenti con bisogni speciali.",
    ],
    "C. Per aiutare tutti gli studenti a avere le stesse opportunità di successo."
  ),
  new Question(
    "13. Cosa implica l’inclusività nella scuola?",
    [
      "A. Una trasformazione sostanziale nella cultura, nella politica e nelle pratiche delle scuole.",
      "B. Ignorare le esigenze degli studenti con bisogni speciali.",
      "C. Separare gli studenti in base alle loro capacità.",
      "D. Creare un ambiente di apprendimento stressante.",
    ],
    "A. Una trasformazione sostanziale nella cultura, nella politica e nelle pratiche delle scuole."
  ),
  new Question(
    "14. Che cosa implica la costruzione di relazioni positive con gli studenti?",
    [
      "A. Ignorare le loro esigenze.",
      "B. Fornire un feedback costruttivo.",
      "C. Criticare continuamente gli studenti.",
      "D. Concentrarsi solo sui risultati accademici.",
    ],
    "B. Fornire un feedback costruttivo."
  ),
  new Question(
    "15. Cosa significa fornire un feedback costruttivo?",
    [
      "A. Criticare gli studenti per ogni errore.",
      "B. Aiutare gli studenti a comprendere i loro punti di forza e le aree di miglioramento.",
      "C. Elogiare gli studenti indipendentemente dai loro sforzi.",
      "D. Fornire solo feedback negativo.",
    ],
    "B. Aiutare gli studenti a comprendere i loro punti di forza e le aree di miglioramento."
  ),
  new Question(
    "16. Qual è uno degli obiettivi dell’approccio inclusivo?",
    [
      "A. Creare una comunità di apprendimento meno collaborativa.",
      "B. Aiutare gli studenti con bisogni speciali a sentirsi accettati e supportati.",
      "C. Promuovere un ambiente di apprendimento stressante.",
      "D. Ignorare le esigenze degli studenti con bisogni speciali.",
    ],
    "B. Aiutare gli studenti con bisogni speciali a sentirsi accettati e supportati."
  ),
  new Question(
    "17. Perché è importante l’empatia nella scuola inclusiva?",
    [
      "A. Per promuovere l’indifferenza.",
      "B. Per aiutare a creare un ambiente di fiducia e supporto.",
      "C. Per creare un ambiente di diffidenza.",
      "D. Per promuovere un atteggiamento chiuso e intollerante.",
    ],
    "B. Per aiutare a creare un ambiente di fiducia e supporto."
  ),
  new Question(
    "18. Cosa implica la flessibilità nell’insegnamento?",
    [
      "A. Rifiutare di adattare l’insegnamento alle esigenze degli studenti.",
      "B. Adattare l’insegnamento alle diverse esigenze degli studenti.",
      "C. Ignorare le esigenze degli studenti con bisogni speciali.",
      "D. Fornire lo stesso tipo di insegnamento a tutti gli studenti.",
    ],
    "B. Adattare l’insegnamento alle diverse esigenze degli studenti."
  ),
  new Question(
    "19. Perché è importante la capacità di problem-solving nella scuola inclusiva?",
    [
      "A. Per ignorare le esigenze degli studenti.",
      "B. Per creare un ambiente di apprendimento ingiusto.",
      "C. Per rispondere in modo efficace alle diverse esigenze degli studenti.",
      "D. Per promuovere un ambiente di apprendimento stressante.",
    ],
    "C. Per rispondere in modo efficace alle diverse esigenze degli studenti."
  ),
  new Question(
    "20. Qual è l’importanza della partecipazione all’apprendimento nell’inclusività?",
    [
      "A. Favorisce la separazione tra gli studenti.",
      "B. Contribuisce a creare un ambiente più positivo e produttivo per tutti.",
      "C. Promuove un ambiente di apprendimento ingiusto.",
      "D. Incoraggia la competizione tra gli studenti.",
    ],
    "B. Contribuisce a creare un ambiente più positivo e produttivo per tutti."
  ),
  new Question(
    "21. Qual è il primo passo per creare un piano di didattica efficace?",
    [
      "A. Adattare immediatamente i materiali didattici.",
      "B. Valutare accuratamente le esigenze di ogni studente.",
      "C. Implementare immediatamente strategie di insegnamento differenziate.",
      "D. Formare gruppi di studenti per il lavoro di gruppo.",
    ],
    "B. Valutare accuratamente le esigenze di ogni studente."
  ),
  new Question(
    "22. Per quale motivo l’uso delle tecnologie assistive è fondamentale nell’insegnamento inclusivo?",
    [
      "A. Per aumentare la dipendenza degli studenti dalla tecnologia.",
      "B. Per permettere agli studenti con difficoltà fisiche o cognitive di partecipare pienamente alle attività di classe.",
      "C. Per rendere gli studenti più competenti nell’uso della tecnologia.",
      "D. Per sostituire completamente l’insegnamento tradizionale con l’insegnamento digitale.",
    ],
    "B. Per permettere agli studenti con difficoltà fisiche o cognitive di partecipare pienamente alle attività di classe."
  ),
  new Question(
    "23. Quale delle seguenti strategie di insegnamento è particolarmente utile per presentare nuovi concetti?",
    [
      "A. Lavoro di gruppo.",
      "B. Apprendimento basato su progetti.",
      "C. Insegnamento diretto.",
      "D. Insegnamento individualizzato.",
    ],
    "C. Insegnamento diretto."
  ),
  new Question(
    "24. Cosa implica l’adattamento dei materiali didattici?",
    [
      "A. Utilizzare solo materiali digitali.",
      "B. Fornire materiali in formati diversi, come testi in grande stampa, materiali audio, o documenti digitali accessibili.",
      "C. Utilizzare solo materiali tattili.",
      "D. Fornire solo materiali in formato cartaceo.",
    ],
    "B. Fornire materiali in formati diversi, come testi in grande stampa, materiali audio, o documenti digitali accessibili."
  ),
  new Question(
    "25. Qual è l’obiettivo del lavoro di gruppo in un contesto inclusivo?",
    [
      "A. Promuovere la competizione tra gli studenti.",
      "B. Promuovere l’interazione sociale, la cooperazione e lo sviluppo delle abilità di problem solving.",
      "C. Incoraggiare gli studenti a lavorare in modo indipendente.",
      "D. Valutare le capacità cognitive degli studenti.",
    ],
    "B. Promuovere l’interazione sociale, la cooperazione e lo sviluppo delle abilità di problem solving."
  ),
  new Question(
    "26. Perché è importante fornire feedback regolare e incoraggiante?",
    [
      "A. Per promuovere la competizione tra gli studenti.",
      "B. Per creare un ambiente di apprendimento stressante.",
      "C. Per favorire la pratica e la ripetizione e fornire un supporto continuo.",
      "D. Per ignorare le esigenze degli studenti con bisogni speciali.",
    ],
    "C. Per favorire la pratica e la ripetizione e fornire un supporto continuo."
  ),
  new Question(
    "27. Perché è importante collaborare con altri professionisti come psicologi, terapisti occupazionali o logopedisti?",
    [
      "A. Per rendere gli studenti dipendenti da altri professionisti.",
      "B. Per garantire un approccio olistico all’insegnamento e all’apprendimento.",
      "C. Per promuovere l’indipendenza degli studenti.",
      "D. Per concentrarsi solo sulle capacità cognitive degli studenti.",
    ],
    "B. Per garantire un approccio olistico all’insegnamento e all’apprendimento."
  ),
  new Question(
    "28. Qual è l’importanza dell’apprendimento basato su progetti?",
    [
      "A. Incoraggiare la competizione tra gli studenti.",
      "B. Ignorare le esigenze degli studenti con bisogni speciali.",
      "C. Aiutare gli studenti a sviluppare abilità pratiche, a pensare in modo critico e a lavorare in modo collaborativo.",
      "D. Fornire solo feedback negativo.",
    ],
    "C. Aiutare gli studenti a sviluppare abilità pratiche, a pensare in modo critico e a lavorare in modo collaborativo."
  ),
  new Question(
    "29. Perché è importante l’adattamento delle attività di classe nell’insegnamento individualizzato?",
    [
      "A. Per promuovere l’ingiustizia.",
      "B. Per fornire supporto specifico adattato alle esigenze di ciascun studente.",
      "C. Per favorire la separazione tra gli studenti.",
      "D. Per creare un ambiente di apprendimento ingiusto.",
    ],
    "B. Per fornire supporto specifico adattato alle esigenze di ciascun studente."
  ),
  new Question(
    "30. Qual è il ruolo del monitoraggio e della valutazione nel piano di didattica efficace?",
    [
      "A. Ignorare i progressi degli studenti.",
      "B. Promuovere un ambiente di apprendimento stressante.",
      "C. Adattare le strategie di insegnamento se necessario e garantire un’azione didattica efficace.",
      "D. Concentrarsi solo sui risultati accademici.",
    ],
    "C. Adattare le strategie di insegnamento se necessario e garantire un’azione didattica efficace."
  ),
];

var questionsSectionFour = [
  new Question(
    "1. Qual è l’importanza dell’intelligenza emotiva nel contesto educativo?",
    [
      "a) Non ha importanza.",
      "b) Facilita la gestione delle relazioni.",
      "c) Rende il materiale didattico più interessante.",
      "d) Aumenta il livello di stress nella classe.",
    ],
    "b) Facilita la gestione delle relazioni."
  ),
  new Question(
    "2. Come può un insegnante con alta intelligenza emotiva influenzare l’ambiente di classe?",
    [
      "a) Creando un ambiente di classe negativo.",
      "b) Ignorando le emozioni degli studenti.",
      "c) Creando un ambiente di classe positivo e supportivo.",
      "d) Concentrandosi esclusivamente sul materiale didattico.",
    ],
    "c) Creando un ambiente di classe positivo e supportivo."
  ),
  new Question(
    "3. Cosa significa essere un insegnante creativo?",
    [
      "a) Seguire sempre lo stesso metodo di insegnamento.",
      "b) Generare idee nuove e originali per rendere l’apprendimento più coinvolgente.",
      "c) Ignorare le difficoltà degli studenti.",
      "d) Utilizzare solo libri di testo tradizionali.",
    ],
    "b) Generare idee nuove e originali per rendere l’apprendimento più coinvolgente."
  ),
  new Question(
    "4. Quali sono i benefici dei materiali didattici innovativi?",
    [
      "a) Rendono l’apprendimento meno interessante.",
      "b) Aiutano gli studenti a comprendere meglio i concetti.",
      "c) Distraggono gli studenti dallo studio.",
      "d) Limitano la creatività degli studenti.",
    ],
    "b) Aiutano gli studenti a comprendere meglio i concetti."
  ),
  new Question(
    "5. Come può la creatività aiutare gli studenti che incontrano difficoltà?",
    [
      "a) Ignorando le loro difficoltà.",
      "b) Trovando soluzioni personalizzate.",
      "c) Dando loro meno attenzione.",
      "d) Assegnando loro più compiti a casa.",
    ],
    "b) Trovando soluzioni personalizzate."
  ),
  new Question(
    "6. Qual è il ruolo della creatività nello sviluppo delle abilità degli studenti?",
    [
      "a) Limita il pensiero critico.",
      "b) Promuove il pensiero critico e lo sviluppo delle abilità creative.",
      "c) Rende gli studenti meno indipendenti.",
      "d) Non ha alcun ruolo nello sviluppo delle abilità.",
    ],
    "b) Promuove il pensiero critico e lo sviluppo delle abilità creative."
  ),
  new Question(
    "7. Perché è importante gestire le proprie emozioni in modo efficace nel contesto educativo?",
    [
      "a) Per creare un ambiente di classe instabile.",
      "b) Per creare un ambiente di classe stabile e sereno.",
      "c) Per concentrarsi solo sulle emozioni negative.",
      "d) Per ignorare le emozioni degli studenti.",
    ],
    "b) Per creare un ambiente di classe stabile e sereno."
  ),
  new Question(
    "8. Come può un insegnante motivare gli studenti?",
    [
      "a) Ignorando le loro esigenze.",
      "b) Riconoscendo e gestendo le loro emozioni.",
      "c) Creando un ambiente di classe negativo.",
      "d) Dando loro punizioni severe.",
    ],
    "b) Riconoscendo e gestendo le loro emozioni."
  ),
  new Question(
    "9. Qual è l’importanza dell’apprendimento cooperativo?",
    [
      "a) Rende gli studenti meno indipendenti.",
      "b) Promuove la competizione tra gli studenti.",
      "c) Rende l’apprendimento più interattivo e coinvolgente.",
      "d) Limita la creatività degli studenti.",
    ],
    "c) Rende l’apprendimento più interattivo e coinvolgente."
  ),
  new Question(
    "10. Come può un docente creativo rendere l’apprendimento più interessante?",
    [
      "a) Utilizzando solo metodi tradizionali di insegnamento.",
      "b) Creando materiali didattici innovativi e adottando approcci innovativi all’insegnamento.",
      "c) Ignorando le esigenze degli studenti.",
      "d) Concentrandosi solo sulla teoria.",
    ],
    "b) Creando materiali didattici innovativi e adottando approcci innovativi all’insegnamento."
  ),
  new Question(
    "11. Perché è importante riconoscere e gestire le emozioni degli studenti?",
    [
      "a) Per ignorare le loro esigenze.",
      "b) Per offrire supporto e incoraggiamento.",
      "c) Per dare loro punizioni severe.",
      "d) Per creare un ambiente di classe negativo.",
    ],
    "b) Per offrire supporto e incoraggiamento."
  ),
  new Question(
    "12. Quali sono i benefici dell’apprendimento basato sui problemi?",
    [
      "a) Limita la creatività degli studenti.",
      "b) Rende l’apprendimento meno interessante.",
      "c) Aiuta a rendere l’apprendimento più interattivo e coinvolgente.",
      "d) Promuove la competizione tra gli studenti.",
    ],
    "c) Aiuta a rendere l’apprendimento più interattivo e coinvolgente."
  ),
  new Question(
    "13. Come può la creatività aiutare a preparare gli studenti per il futuro?",
    [
      "a) Limitando il loro pensiero critico.",
      "b) Promuovendo il pensiero critico e la creatività.",
      "c) Rendendo gli studenti meno indipendenti.",
      "d) Concentrandosi solo sulle abilità tradizionali.",
    ],
    "b) Promuovendo il pensiero critico e la creatività."
  ),
  new Question(
    "14. Qual è il ruolo dell’intelligenza emotiva nella gestione delle relazioni?",
    [
      "a) Non ha alcun ruolo.",
      "b) Rende più difficile la gestione delle relazioni.",
      "c) Aiuta a gestire le relazioni in modo efficace.",
      "d) Crea conflitti nelle relazioni.",
    ],
    "c) Aiuta a gestire le relazioni in modo efficace."
  ),
  new Question(
    "15. Come può un docente creativo trovare soluzioni personalizzate per gli studenti?",
    [
      "a) Ignorando le loro difficoltà.",
      "b) Adattando esercizi o attività specifiche.",
      "c) Assegnando loro più compiti a casa.",
      "d) Concentrandosi solo sulle abilità tradizionali.",
    ],
    "b) Adattando esercizi o attività specifiche."
  ),
  new Question(
    "16. L’intelligenza emotiva è importante nel contesto educativo perché:",
    [
      "A. Aiuta gli insegnanti a creare materiale didattico innovativo.",
      "B. Promuove la collaborazione e l’interazione tra gli studenti.",
      "C. Rende l’insegnamento e l’apprendimento più efficaci.",
      "D. Tutte le risposte sono corrette.",
    ],
    "D. Tutte le risposte sono corrette."
  ),
  new Question(
    "17. Un insegnante con un’alta intelligenza emotiva è in grado di:",
    [
      "A. Gestire solo le proprie emozioni in modo efficace.",
      "B. Creare solo un ambiente di classe stabile e sereno.",
      "C. Offrire solo supporto e incoraggiamento agli studenti quando prendono brutti voti.",
      "D. Riconoscere e gestire le emozioni degli studenti.",
    ],
    "D. Riconoscere e gestire le emozioni degli studenti."
  ),
  new Question(
    "18. La creatività nell’insegnamento può:",
    [
      "A. Implementare nuovi metodi di insegnamento.",
      "B. Aiutare studenti nei propri hobby extra scolastici.",
      "C. Stimolare solo il pensiero critico e le abilità creative degli studenti.",
      "D. Rendere l’apprendimento solo più interattivo e coinvolgente.",
    ],
    "A. Implementare nuovi metodi di insegnamento."
  ),
  new Question(
    "19. Il pensiero divergente è fondamentale per:",
    [
      "A. Sviluppare grande abilità matematiche.",
      "B. Promuovere nuove idee e prospettive.",
      "C. Stimolare solo l’innovazione.",
      "D. Risolvere solo problemi complessi e interconnessi.",
    ],
    "B. Promuovere nuove idee e prospettive."
  ),
  new Question(
    "20. L’autoanalisi delle dimensioni emotive può aiutare a:",
    [
      "A. Creare un ambiente di apprendimento più positivo e supportivo.",
      "B. Sviluppare la consapevolezza delle proprie competenze.",
      "C. Migliorare le abilità di valutazione critica.",
      "D. Tutte le risposte sono corrette.",
    ],
    "D. Tutte le risposte sono corrette."
  ),
  new Question(
    "21. L’INVALSI valuta le competenze fondamentali degli studenti in:",
    [
      "A. Matematica, Italiano e Inglese.",
      "B. Storia, Geografia e Scienze.",
      "C. Arte, Musica e Educazione Fisica.",
      "D. Tutte le materie.",
    ],
    "A. Matematica, Italiano e Inglese."
  ),
  new Question(
    "22. Uno svantaggio della valutazione standardizzata dell’INVALSI è:",
    [
      "A. L’ansia e lo stress che può creare negli studenti.",
      "B. La mancanza di confronto tra le diverse scuole.",
      "C. L’incapacità di valutare le competenze fondamentali.",
      "D. La mancanza di feedback tempestivi per gli studenti.",
    ],
    "A. L’ansia e lo stress che può creare negli studenti."
  ),
  new Question(
    "23. Un vantaggio della valutazione degli apprendimenti da parte dei docenti è:",
    [
      "A. La valutazione standardizzata delle competenze degli studenti.",
      "B. La valutazione più completa e personalizzata degli studenti.",
      "C. La possibilità di confrontare le performance delle diverse scuole.",
      "D. L’obbligo degli studenti di autovalutarsi.",
    ],
    "B. La valutazione più completa e personalizzata degli studenti."
  ),
  new Question(
    "24. Un suggerimento per migliorare il sistema di valutazione scolastico è:",
    [
      "A. Integrare nella valutazione anche competenze sociali, emotive o creative.",
      "B. Eliminare la valutazione degli apprendimenti da parte dei docenti.",
      "C. Concentrarsi solo sulle materie valutate dall’INVALSI.",
      "D. Non coinvolgere gli studenti nel processo di valutazione.",
    ],
    "A. Integrare nella valutazione anche competenze sociali, emotive o creative."
  ),
  new Question(
    "25. La mindfulness può essere utile per:",
    [
      "A. Sviluppare una maggiore consapevolezza delle proprie dimensioni emotive.",
      "B. Creare materiali didattici innovativi.",
      "C. Migliorare le abilità di interazione e collaborazione degli studenti.",
      "D. Valutare le competenze degli studenti in modo standardizzato.",
    ],
    "A. Sviluppare una maggiore consapevolezza delle proprie dimensioni emotive."
  ),
  new Question(
    "26. La valutazione formativa continua è importante perché:",
    [
      "A. Permette di monitorare il progresso degli studenti durante tutto l’anno scolastico.",
      "B. Aiuta a identificare punti di forza e aree di miglioramento delle scuole.",
      "C. Fornisce una valutazione standardizzata delle competenze degli studenti.",
      "D. Incentiva una competizione non sana tra scuole.",
    ],
    "A. Permette di monitorare il progresso degli studenti durante tutto l’anno scolastico."
  ),
  new Question(
    "27. Il pensiero divergente può aiutare a personalizzare l’apprendimento perché:",
    [
      "A. Incentiva l’esplorazione di diverse strategie e approcci all’apprendimento.",
      "B. Promuove l’uso di materiali didattici innovativi.",
      "C. Encourage competition among students.",
      "D. Fornisce una valutazione standardizzata delle competenze degli studenti.",
    ],
    "A. Incentiva l’esplorazione di diverse strategie e approcci all’apprendimento."
  ),
  new Question(
    "28. L’approccio educativo olistico si contrappone a:",
    [
      "A. Focalizzarsi eccessivamente sui risultati dei test.",
      "B. Promuovere il pensiero critico e creativo.",
      "C. Incoraggiare la condivisione e la discussione delle idee.",
      "D. Adattare l’apprendimento alle esigenze individuali degli studenti.",
    ],
    "A. Focalizzarsi eccessivamente sui risultati dei test."
  ),
  new Question(
    "29. La capacità di motivarsi e di motivare gli altri è una componente dell’:",
    [
      "A. Pensiero divergente.",
      "B. Intelligenza emotiva.",
      "C. Creatività.",
      "D. Valutazione formativa continua.",
    ],
    "B. Intelligenza emotiva."
  ),
  new Question(
    "30. L’apprendimento basato sui problemi è un esempio di:",
    [
      "A. Materiale didattico innovativo.",
      "B. Approccio innovativo all’insegnamento.",
      "C. Soluzione personalizzata per gli studenti.",
      "D. Metodo di valutazione standardizzato.",
    ],
    "B. Approccio innovativo all’insegnamento."
  ),
];

var questionsSectionFive = [
  new Question(
    "1. Qual è il principale vantaggio dell’utilizzo della tecnologia nell’istruzione?",
    [
      "a) Riduzione dei costi",
      "b) Personalizzazione dell’apprendimento",
      "c) Facilità di accesso alle informazioni",
      "d) Tutte le risposte sono corrette",
    ],
    "d) Tutte le risposte sono corrette"
  ),
  new Question(
    "2. Quali dispositivi possono essere utilizzati per supportare gli studenti con difficoltà di apprendimento?",
    ["a) Tablet", "b) Laptop", "c) Dispositivi mobili", "d) Tutti i suddetti"],
    "d) Tutti i suddetti"
  ),
  new Question(
    "3. Qual è il ruolo dei video didattici nell’apprendimento?",
    [
      "a) Distrazione",
      "b) Rendere l’apprendimento più visivo",
      "c) Riduzione del coinvolgimento degli studenti",
      "d) Aumentare il carico di lavoro degli insegnanti",
    ],
    "b) Rendere l’apprendimento più visivo"
  ),
  new Question(
    "4. Come possono i giochi educativi aiutare gli studenti?",
    [
      "a) Promuovendo la competizione",
      "b) Facilitando la memorizzazione",
      "c) Riducendo la loro capacità di concentrazione",
      "d) Aumentando il loro livello di stress",
    ],
    "b) Facilitando la memorizzazione"
  ),
  new Question(
    "5. Perché è importante integrare la tecnologia nell’educazione speciale?",
    [
      "a) Per aumentare la dipendenza dalla tecnologia",
      "b) Per aumentare il carico di lavoro degli studenti",
      "c) Per ridurre l’interazione tra insegnante e studente",
      "d) Per favorire l’indipendenza e l’autonomia degli studenti",
    ],
    "d) Per favorire l’indipendenza e l’autonomia degli studenti"
  ),
  new Question(
    "6. Qual è il vantaggio principale dell’uso di app educative?",
    [
      "a) Aumenta il tempo trascorso sugli schermi",
      "b) Permette l’apprendimento in movimento",
      "c) Promuove l’uso eccessivo di dispositivi elettronici",
      "d) Rende gli studenti meno responsabili",
    ],
    "b) Permette l’apprendimento in movimento"
  ),
  new Question(
    "7. Come può la realtà virtuale essere utile nell’istruzione?",
    [
      "a) Creando distrazioni",
      "b) Fornendo esperienze immersiva",
      "c) Riducendo la capacità di concentrazione",
      "d) Aumentando il livello di stress",
    ],
    "b) Fornendo esperienze immersiva"
  ),
  new Question(
    "8. Perché è importante l’uso di strumenti di apprendimento visivo per gli studenti con difficoltà di apprendimento?",
    [
      "a) Per facilitare la comprensione dei concetti",
      "b) Per aumentare la loro dipendenza dalla tecnologia",
      "c) Per ridurre la loro capacità di concentrazione",
      "d) Per aumentare il loro livello di stress",
    ],
    "a) Per facilitare la comprensione dei concetti"
  ),
  new Question(
    "9. Come può l’apprendimento online supportare gli studenti con bisogni educativi speciali?",
    [
      "a) Riducendo la loro interazione sociale",
      "b) Offrendo loro un ambiente di apprendimento flessibile",
      "c) Aumentando il loro livello di stress",
      "d) Promuovendo la loro dipendenza dalla tecnologia",
    ],
    "b) Offrendo loro un ambiente di apprendimento flessibile"
  ),
  new Question(
    "10. Qual è il ruolo delle risorse digitali nell’istruzione?",
    [
      "a) Sostituire gli insegnanti",
      "b) Creare distrazioni",
      "c) Arricchire il materiale didattico",
      "d) Ridurre l’efficacia dell’apprendimento",
    ],
    "c) Arricchire il materiale didattico"
  ),
  new Question(
    "11. Qual è il vantaggio dell’utilizzo di e-book nell’educazione?",
    [
      "a) Promuove la distrazione",
      "b) Riduce la necessità di materiali cartacei",
      "c) Riduce l’accessibilità al materiale didattico",
      "d) Aumenta il carico di lavoro degli studenti",
    ],
    "b) Riduce la necessità di materiali cartacei"
  ),
  new Question(
    "12. Come può la tecnologia assistiva supportare gli studenti con difficoltà di apprendimento?",
    [
      "a) Aumentando il loro livello di stress",
      "b) Fornendo strumenti e risorse che facilitano l’apprendimento",
      "c) Promuovendo la loro dipendenza dalla tecnologia",
      "d) Riducendo la loro interazione con gli insegnanti",
    ],
    "b) Fornendo strumenti e risorse che facilitano l’apprendimento"
  ),
  new Question(
    "13. Qual è il vantaggio principale dell’uso della realtà aumentata nell’educazione?",
    [
      "a) Promuove la distrazione",
      "b) Aumenta il carico di lavoro degli studenti",
      "c) Riduce la capacità di concentrazione",
      "d) Rende l’apprendimento più interattivo",
    ],
    "d) Rende l’apprendimento più interattivo"
  ),
  new Question(
    "14. Come può l’uso di podcast educativi essere utile per gli studenti?",
    [
      "a) Riducendo la loro capacità di concentrazione",
      "b) Offrendo un modo alternativo per accedere al materiale didattico",
      "c) Aumentando il loro livello di stress",
      "d) Promuovendo la loro dipendenza dalla tecnologia",
    ],
    "b) Offrendo un modo alternativo per accedere al materiale didattico"
  ),
  new Question(
    "15. Perché è importante insegnare ai bambini competenze digitali fin dalla tenera età?",
    [
      "a) Per promuovere la dipendenza dalla tecnologia",
      "b) Per prepararli per un mondo sempre più digitalizzato",
      "c) Per ridurre la loro capacità di interagire socialmente",
      "d) Per aumentare il loro livello di stress",
    ],
    "b) Per prepararli per un mondo sempre più digitalizzato"
  ),
  new Question(
    "16. Come può l’uso di software di apprendimento interattivo aiutare gli studenti?",
    [
      "a) Facilitando la comprensione dei concetti",
      "b) Creando distrazioni",
      "c) Aumentando il loro livello di stress",
      "d) Riducendo la loro capacità di concentrazione",
    ],
    "a) Facilitando la comprensione dei concetti"
  ),
  new Question(
    "17. Qual è il ruolo dei social media nell’educazione?",
    [
      "a) Promuovere l’isolamento sociale",
      "b) Fornire una piattaforma per la condivisione delle conoscenze",
      "c) Ridurre la capacità di concentrazione",
      "d) Aumentare il livello di stress",
    ],
    "b) Fornire una piattaforma per la condivisione delle conoscenze"
  ),
  new Question(
    "18. Perché è importante incoraggiare gli studenti a usare Internet in modo responsabile?",
    [
      "a) Per promuovere l’uso eccessivo di Internet",
      "b) Per proteggerli da contenuti inappropriati e pericoli online",
      "c) Per ridurre la loro interazione sociale",
      "d) Per aumentare il loro livello di stress",
    ],
    "b) Per proteggerli da contenuti inappropriati e pericoli online"
  ),
  new Question(
    "19. Come può l’uso di software di apprendimento adattivo supportare gli studenti?",
    [
      "a) Creando distrazioni",
      "b) Riducendo la loro interazione con gli insegnanti",
      "c) Aumentando il loro livello di stress",
      "d) Fornendo un percorso di apprendimento personalizzato",
    ],
    "d) Fornendo un percorso di apprendimento personalizzato"
  ),
  new Question(
    "20. Qual è il vantaggio principale dell’uso di tablet nell’educazione?",
    [
      "a) Promuove la dipendenza dalla tecnologia",
      "b) Rende l’apprendimento più flessibile e interattivo",
      "c) Riduce la capacità di concentrazione",
      "d) Aumenta il carico di lavoro degli studenti",
    ],
    "b) Rende l’apprendimento più flessibile e interattivo"
  ),
  new Question(
    "21. Come può la tecnologia mobile supportare l’apprendimento a distanza?",
    [
      "a) Riducendo la capacità di concentrazione",
      "b) Fornendo accesso a risorse e materiali didattici ovunque si trovino",
      "c) Aumentando il livello di stress",
      "d) Promuovendo l’isolamento sociale",
    ],
    "b) Fornendo accesso a risorse e materiali didattici ovunque si trovino"
  ),
  new Question(
    "22. Perché è importante l’uso di strumenti di apprendimento audio per gli studenti con difficoltà di apprendimento?",
    [
      "a) Per facilitare la memorizzazione e la comprensione dei concetti",
      "b) Per aumentare il loro livello di stress",
      "c) Per ridurre la loro capacità di concentrazione",
      "d) Per promuovere la loro dipendenza dalla tecnologia",
    ],
    "a) Per facilitare la memorizzazione e la comprensione dei concetti"
  ),
  new Question(
    "23. Come può l’uso di piattaforme di apprendimento online essere utile per gli studenti?",
    [
      "a) Offrendo un ambiente di apprendimento flessibile e personalizzato",
      "b) Riducendo la loro interazione sociale",
      "c) Aumentando il loro livello di stress",
      "d) Promuovendo la loro dipendenza dalla tecnologia",
    ],
    "a) Offrendo un ambiente di apprendimento flessibile e personalizzato"
  ),
  new Question(
    "24. Qual è il ruolo delle app di organizzazione nell’educazione?",
    [
      "a) Promuovere la distrazione",
      "b) Aiutare gli studenti a gestire il loro tempo e le loro attività in modo efficace",
      "c) Ridurre la capacità di concentrazione",
      "d) Aumentare il livello di stress",
    ],
    "b) Aiutare gli studenti a gestire il loro tempo e le loro attività in modo efficace"
  ),
  new Question(
    "25. Perché è importante che gli insegnanti siano formati sull’uso della tecnologia nell’educazione?",
    [
      "a) Per aumentare il loro carico di lavoro",
      "b) Per integrare efficacemente la tecnologia nell’insegnamento",
      "c) Per promuovere la dipendenza dalla tecnologia",
      "d) Per ridurre l’interazione con gli studenti",
    ],
    "b) Per integrare efficacemente la tecnologia nell’insegnamento"
  ),
  new Question(
    "26. Come possono le app di realtà virtuale essere utilizzate per migliorare l’apprendimento degli studenti?",
    [
      "a) Creando distrazioni",
      "b) Riducendo la capacità di concentrazione",
      "c) Fornendo esperienze immersive che facilitano la comprensione dei concetti",
      "d) Aumentando il livello di stress",
    ],
    "c) Fornendo esperienze immersive che facilitano la comprensione dei concetti"
  ),
  new Question(
    "27. Qual è il vantaggio principale dell’uso di dispositivi mobili nell’educazione?",
    [
      "a) Promuove la dipendenza dalla tecnologia",
      "b) Fornisce accesso a risorse e materiali didattici ovunque si trovino",
      "c) Riduce la capacità di concentrazione",
      "d) Aumenta il carico di lavoro degli studenti",
    ],
    "b) Fornisce accesso a risorse e materiali didattici ovunque si trovino"
  ),
  new Question(
    "28. Come può l’uso di software di simulazione essere utile nell’educazione?",
    [
      "a) Promuovendo la distrazione",
      "b) Fornendo un modo sicuro ed efficace per praticare abilità e concetti",
      "c) Riducendo la capacità di concentrazione",
      "d) Aumentando il livello di stress",
    ],
    "b) Fornendo un modo sicuro ed efficace per praticare abilità e concetti"
  ),
  new Question(
    "29. Perché è importante l’uso di strumenti di apprendimento interattivo per gli studenti con difficoltà di apprendimento?",
    [
      "a) Per facilitare la comprensione e la memorizzazione dei concetti",
      "b) Per aumentare il loro livello di stress",
      "c) Per ridurre la loro capacità di concentrazione",
      "d) Per promuovere la loro dipendenza dalla tecnologia",
    ],
    "a) Per facilitare la comprensione e la memorizzazione dei concetti"
  ),
  new Question(
    "30. Qual è il ruolo dei blog educativi nell’apprendimento?",
    [
      "a) Promuovere l’isolamento sociale",
      "b) Un buon passatempo per sostituire il vero insegnamento",
      "c) Ridurre la capacità di concentrazione",
      "d) Fornire una piattaforma per la condivisione delle conoscenze e delle idee",
    ],
    "d) Fornire una piattaforma per la condivisione delle conoscenze e delle idee"
  ),
];

var questionsSectionSix = [
  new Question(
    "1. Qual è il sinonimo di 'important'?",
    ["A. Trivial", "B. Significant", "C. Negligible", "D. Unnecessary"],
    "B. Significant"
  ),
  new Question(
    "2. Cosa significa 'to postpone'?",
    ["A. To advance", "B. To delay", "C. To hasten", "D. To speed up"],
    "B. To delay"
  ),
  new Question(
    "3. Quale delle seguenti parole è un sostantivo?",
    ["A. Quickly", "B. Happiness", "C. Beautiful", "D. Sadly"],
    "B. Happiness"
  ),
  new Question(
    "4. Qual è il contrario di 'ancient'?",
    ["A. Modern", "B. Old", "C. Antiquated", "D. Archaic"],
    "A. Modern"
  ),
  new Question(
    "5. Completa la frase: 'She ____ to the gym every morning.'",
    ["A. Go", "B. Goes", "C. Going", "D. To go"],
    "B. Goes"
  ),
  new Question(
    "6. Quale delle seguenti parole è un avverbio?",
    ["A. Quickly", "B. Quick", "C. Quicken", "D. Quickest"],
    "A. Quickly"
  ),
  new Question(
    "7. Qual è il passato di 'to write'?",
    ["A. Writed", "B. Wrote", "C. Written", "D. Write"],
    "B. Wrote"
  ),
  new Question(
    "8. Quale preposizione si usa dopo 'interested'?",
    ["A. On", "B. In", "C. At", "D. With"],
    "B. In"
  ),
  new Question(
    "9. Completa la frase: 'If it rains, I ____ stay at home.'",
    ["A. Will", "B. Would", "C. Am", "D. Was"],
    "A. Will"
  ),
  new Question(
    "10. Quale delle seguenti parole è un verbo?",
    ["A. Celebration", "B. Celebrate", "C. Celebratory", "D. Celebrating"],
    "B. Celebrate"
  ),
  new Question(
    "11. Cosa significa 'to enhance'?",
    ["A. To diminish", "B. To improve", "C. To worsen", "D. To reduce"],
    "B. To improve"
  ),
  new Question(
    "12. Quale delle seguenti parole è un aggettivo?",
    ["A. Happily", "B. Happy", "C. Happiness", "D. Happen"],
    "B. Happy"
  ),
  new Question(
    "13. Qual è il passato di 'to read'?",
    ["A. Readed", "B. Read", "C. Reading", "D. Reader"],
    "B. Read"
  ),
  new Question(
    "14. Quale preposizione si usa dopo 'good'?",
    ["A. On", "B. In", "C. At", "D. For"],
    "D. For"
  ),
  new Question(
    "15. Completa la frase: 'She is ____ than her sister.'",
    ["A. Tall", "B. Taller", "C. Tallest", "D. The tallest"],
    "B. Taller"
  ),
  new Question(
    "16. Quale delle seguenti parole è un nome proprio?",
    ["A. Mountain", "B. River", "C. John", "D. City"],
    "C. John"
  ),
  new Question(
    "17. Cosa significa 'to acquire'?",
    ["A. To get", "B. To lose", "C. To give", "D. To lend"],
    "A. To get"
  ),
  new Question(
    "18. Quale delle seguenti parole è un pronome?",
    ["A. He", "B. His", "C. Him", "D. Himself"],
    "A. He"
  ),
  new Question(
    "19. Qual è il passato di 'to speak'?",
    ["A. Spoke", "B. Speaked", "C. Spoken", "D. Speaking"],
    "A. Spoke"
  ),
  new Question(
    "20. Quale preposizione si usa dopo 'depend'?",
    ["A. On", "B. In", "C. At", "D. With"],
    "A. On"
  ),
  new Question(
    "21. Completa la frase: 'She has been living here ____ 10 years.'",
    ["A. Since", "B. For", "C. During", "D. While"],
    "B. For"
  ),
  new Question(
    "22. Quale delle seguenti parole è un articolo?",
    ["A. A", "B. An", "C. The", "D. This"],
    "C. The"
  ),
  new Question(
    "23. Cosa significa 'to comprehend'?",
    ["A. To understand", "B. To confuse", "C. To complicate", "D. To miss"],
    "A. To understand"
  ),
  new Question(
    "24. Quale delle seguenti parole è un congiuntivo?",
    ["A. And", "B. But", "C. Or", "D. Yet"],
    "D. Yet"
  ),
  new Question(
    "25. Qual è il passato di 'to do'?",
    ["A. Done", "B. Did", "C. Doing", "D. Does"],
    "B. Did"
  ),
  new Question(
    "26. Quale preposizione si usa dopo 'excited'?",
    ["A. On", "B. In", "C. At", "D. About"],
    "D. About"
  ),
  new Question(
    "27. Completa la frase: 'If I had known, I ____ told you.'",
    ["A. Will have", "B. Would have", "C. Had", "D. Would"],
    "B. Would have"
  ),
  new Question(
    "28. Quale delle seguenti parole è un avverbio di modo?",
    ["A. Quick", "B. Quickly", "C. Quicker", "D. Quickest"],
    "B. Quickly"
  ),
  new Question(
    "29. Cosa significa 'to diminish'?",
    ["A. To increase", "B. To decrease", "C. To enlarge", "D. To expand"],
    "B. To decrease"
  ),
  new Question(
    "30. Quale delle seguenti parole è un sostantivo plurale?",
    ["A. Child", "B. Woman", "C. Men", "D. Mouse"],
    "C. Men"
  ),
  new Question(
    "31. Completa la frase con la forma corretta del verbo: 'If I ____ (know) it was your birthday, I would have bought a gift.'",
    ["A. Know", "B. Knew", "C. Had known", "D. Have known"],
    "C. Had known"
  ),
  new Question(
    "32. Quale delle seguenti frasi è corretta?",
    [
      "A. She neither likes coffee nor tea.",
      "B. She likes neither coffee nor tea.",
      "C. She neither likes coffee or tea.",
      "D. She likes neither coffee or tea.",
    ],
    "B. She likes neither coffee nor tea."
  ),
  new Question(
    "33. Qual è il modo corretto per esprimere un’azione futura pianificata?",
    [
      "A. I will go to the doctor tomorrow.",
      "B. I am going to the doctor tomorrow.",
      "C. I go to the doctor tomorrow.",
      "D. I am going the doctor tomorrow.",
    ],
    "B. I am going to the doctor tomorrow."
  ),
  new Question(
    "34. Quale delle seguenti frasi è grammaticalmente corretta?",
    [
      "A. Despite of the rain, we went out.",
      "B. Despite the rain, we went out.",
      "C. In spite of the rain, we went out.",
      "D. Both B and C.",
    ],
    "D. Both B and C."
  ),
  new Question(
    "35. Quale parola completa correttamente la frase? 'She is responsible ____ managing the team.'",
    ["A. For", "B. Of", "C. In", "D. To"],
    "A. For"
  ),
  new Question(
    "36. Qual è la forma corretta del verbo modale nella frase? 'You ____ smoke in public places. It’s prohibited.'",
    ["A. Mustn’t", "B. Don’t have to", "C. Couldn’t", "D. Needn’t"],
    "A. Mustn’t"
  ),
  new Question(
    "37. Completa la frase con il verbo corretto: 'By the time we arrived, the movie ____ already started.'",
    ["A. Has", "B. Had", "C. Have", "D. Was"],
    "B. Had"
  ),
  new Question(
    "38. Quale preposizione si usa dopo 'apologize'?",
    ["A. For", "B. To", "C. About", "D. With"],
    "A. For"
  ),
  new Question(
    "39. Quale delle seguenti parole è un avverbio di frequenza?",
    ["A. Sometimes", "B. Some time", "C. Sometime", "D. Some times"],
    "A. Sometimes"
  ),
  new Question(
    "40. Quale forma verbale è corretta nella frase? 'I can’t help ____ (cry) when I watch a sad movie.'",
    ["A. To cry", "B. Crying", "C. Cry", "D. To crying"],
    "B. Crying"
  ),
  new Question(
    "41. Completa la frase: 'Despite ____ (work) hard, she didn’t pass the exam.'",
    ["A. Working", "B. Work", "C. To work", "D. Worked"],
    "A. Working"
  ),
];

var questionSectionSeven = [
  new Question(
    "1. Che cosa è il 'periodo critico' nello sviluppo infantile?",
    [
      "A. Un momento specifico durante il quale un certo tipo di sviluppo deve accadere affinché lo sviluppo normale continui",
      "B. Un momento in cui il bambino è particolarmente sensibile a stimoli negativi dall’ambiente",
      "C. Un periodo durante il quale il bambino è particolarmente resistente al cambiamento",
      "D. Un momento in cui il bambino inizia a sviluppare una maggiore indipendenza dai genitori",
    ],
    "A. Un momento specifico durante il quale un certo tipo di sviluppo deve accadere affinché lo sviluppo normale continui"
  ),
  new Question(
    "2. Perché è importante l’autoregolazione nello sviluppo infantile?",
    [
      "A. Perché aiuta i bambini a sviluppare un senso di sicurezza e stabilità",
      "B. Perché permette ai bambini di controllare il loro comportamento, le loro emozioni e i loro pensieri",
      "C. Perché aiuta i bambini a sviluppare relazioni sociali sane",
      "D. Perché promuove lo sviluppo fisico e motorio",
    ],
    "B. Perché permette ai bambini di controllare il loro comportamento, le loro emozioni e i loro pensieri"
  ),
  new Question(
    "3. Qual è il ruolo delle interazioni sociali nello sviluppo cognitivo secondo Vygotsky?",
    [
      "A. Le interazioni sociali sono fondamentali perché permettono lo scambio di informazioni e la costruzione condivisa della conoscenza",
      "B. Le interazioni sociali sono importanti solo in alcune fasi dello sviluppo",
      "C. Le interazioni sociali non hanno un ruolo significativo nello sviluppo cognitivo",
      "D. Le interazioni sociali sono importanti solo per lo sviluppo emotivo e sociale, non per lo sviluppo cognitivo",
    ],
    "A. Le interazioni sociali sono fondamentali perché permettono lo scambio di informazioni e la costruzione condivisa della conoscenza"
  ),
  new Question(
    "4. Che cos’è l’assimilazione nella teoria dello sviluppo cognitivo di Piaget?",
    [
      "A. Il processo di modifica delle schemata esistenti per incorporare nuove informazioni",
      "B. Il processo di acquisizione di nuove schemata",
      "C. Il processo di adattamento delle schemata esistenti per rendere conto delle nuove esperienze",
      "D. Il processo di incorporare nuove informazioni nelle schemata esistenti",
    ],
    "D. Il processo di incorporare nuove informazioni nelle schemata esistenti"
  ),
  new Question(
    "5. Secondo Maslow, quale è il bisogno più fondamentale?",
    [
      "A. Il bisogno di autorealizzazione",
      "B. Il bisogno di appartenenza e amore",
      "C. Il bisogno di stima",
      "D. Il bisogno di sicurezza",
    ],
    "D. Il bisogno di sicurezza"
  ),
  new Question(
    "6. Che cos’è l’empatia?",
    [
      "A. La capacità di identificarsi con i sentimenti, i pensieri o le attitudini di un’altra persona",
      "B. La capacità di comprendere i pensieri e i sentimenti degli altri senza identificarsi con essi",
      "C. La capacità di condividere i sentimenti di un’altra persona",
      "D. La capacità di rispondere in modo appropriato ai sentimenti degli altri",
    ],
    "A. La capacità di identificarsi con i sentimenti, i pensieri o le attitudini di un’altra persona"
  ),
  new Question(
    "7. Qual è il ruolo del gioco simbolico nello sviluppo cognitivo dei bambini?",
    [
      "A. Favorisce lo sviluppo delle abilità motorie",
      "B. Promuove la capacità di risolvere problemi",
      "C. Aiuta i bambini a sviluppare la capacità di pensare in modo astratto",
      "D. Aiuta i bambini a comprendere il mondo fisico",
    ],
    "C. Aiuta i bambini a sviluppare la capacità di pensare in modo astratto"
  ),
  new Question(
    "8. Che cos’è il condizionamento operante?",
    [
      "A. Un tipo di apprendimento in cui un comportamento viene rafforzato o indebolito dalle conseguenze che lo seguono",
      "B. Un tipo di apprendimento in cui un comportamento viene associato a un nuovo stimolo",
      "C. Un tipo di apprendimento in cui un comportamento viene appreso attraverso l’osservazione e l’imitazione degli altri",
      "D. Un tipo di apprendimento in cui un comportamento viene modificato attraverso la pratica e la ripetizione",
    ],
    "A. Un tipo di apprendimento in cui un comportamento viene rafforzato o indebolito dalle conseguenze che lo seguono"
  ),
  new Question(
    "9. Secondo Erikson, qual è la sfida principale dell’adolescenza?",
    [
      "A. Identità vs Confusione di Ruolo",
      "B. Intimità vs Isolamento",
      "C. Generatività vs Stagnazione",
      "D. Integrità dell’io vs Disperazione",
    ],
    "A. Identità vs Confusione di Ruolo"
  ),
  new Question(
    "10. Che cos’è il condizionamento classico?",
    [
      "A. Un tipo di apprendimento in cui un comportamento viene rafforzato o indebolito dalle conseguenze che lo seguono",
      "B. Un tipo di apprendimento in cui un comportamento viene associato a un nuovo stimolo",
      "C. Un tipo di apprendimento in cui un comportamento viene appreso attraverso l’osservazione e l’imitazione degli altri",
      "D. Un tipo di apprendimento in cui un comportamento viene modificato attraverso la pratica e la ripetizione",
    ],
    "B. Un tipo di apprendimento in cui un comportamento viene associato a un nuovo stimolo"
  ),

  new Question(
    "11. Come possono i genitori favorire lo sviluppo dell’autostima nei loro figli?",
    [
      "A. Offrendo loro amore incondizionato",
      "B. Criticando i loro errori",
      "C. Confrontandoli con i loro coetanei",
      "D. Proteggendoli da tutte le difficoltà",
    ],
    "A. Offrendo loro amore incondizionato"
  ),

  new Question(
    "12. Come l’educazione digitale può contribuire a ridurre il divario educativo?",
    [
      "A. Ignorando le esigenze degli studenti rurali",
      "B. Rendendo l’istruzione accessibile in aree remote",
      "C. Fornendo solo risorse digitali",
      "D. Limitando l’accesso alle risorse educative",
    ],
    "B. Rendendo l’istruzione accessibile in aree remote"
  ),

  new Question(
    "13. Qual è uno dei principali svantaggi dell’apprendimento collaborativo online?",
    [
      "A. Promuove la competizione individuale",
      "B. Rende l’apprendimento meno autentico",
      "C. Può essere difficile valutare la partecipazione individuale",
      "D. Incoraggia l’apprendimento passivo",
    ],
    "B. Rende l’apprendimento meno autentico"
  ),

  new Question(
    "14. Perché è importante incoraggiare l’apprendimento autonomo nell’educazione digitale?",
    [
      "A. Sviluppa la dipendenza dall’insegnante",
      "B. Promuove la responsabilità e l’autoregolamentazione",
      "C. Incoraggia la memorizzazione meccanica",
      "D. Riduce la necessità di riflessione",
    ],
    "B. Promuove la responsabilità e l’autoregolamentazione"
  ),

  new Question(
    "15. Come può il metodo socratico promuovere la riflessione personale?",
    [
      "A. Favorisce l’assimilazione passiva delle informazioni",
      "B. Stimola la discussione e l’analisi critica",
      "C. Incoraggia la memorizzazione meccanica",
      "D. Promuove la dipendenza dall’insegnante",
    ],
    "B. Stimola la discussione e l’analisi critica"
  ),

  new Question(
    "16. Qual è una delle sfide principali nella realizzazione di una classe capovolta?",
    [
      "A. Incoraggia la memorizzazione meccanica",
      "B. Richiede una maggiore preparazione e organizzazione",
      "C. Promuove la dipendenza dall’insegnante",
      "D. Riduce l’interazione studente-studente",
    ],
    "B. Richiede una maggiore preparazione e organizzazione"
  ),

  new Question(
    "17. Perché è importante considerare le diverse modalità di apprendimento degli studenti nell’educazione digitale?",
    [
      "A. Per classificare gli studenti in base alle loro prestazioni",
      "B. Per fornire un’unica modalità di apprendimento a tutti",
      "C. Per adattare l’istruzione alle esigenze individuali",
      "D. Per promuovere l’uso esclusivo di risorse digitali",
    ],
    "C. Per adattare l’istruzione alle esigenze individuali"
  ),

  new Question(
    "18. Qual è uno dei principali vantaggi dell’uso di materiali didattici interattivi?",
    [
      "A. Promuovono la memorizzazione meccanica",
      "B. Rendono l’apprendimento più coinvolgente",
      "C. Limitano la creatività degli studenti",
      "D. Rendono l’apprendimento meno autentico",
    ],
    "B. Rendono l’apprendimento più coinvolgente"
  ),

  new Question(
    "19. Perché è importante incorporare attività pratiche nell’istruzione?",
    [
      "A. Promuovono la memorizzazione meccanica",
      "B. Stimolano lo sviluppo delle competenze pratiche e cognitive",
      "C. Limitano l’interazione studente-studente",
      "D. Riducono la necessità di riflessione e analisi",
    ],
    "B. Stimolano lo sviluppo delle competenze pratiche e cognitive"
  ),

  new Question(
    "20. Qual è uno degli svantaggi principali del metodo di insegnamento diretto?",
    [
      "A. Promuove la creatività degli studenti",
      "B. Incoraggia l’apprendimento passivo",
      "C. Stimola lo sviluppo delle competenze pratiche",
      "D. Promuove l’interazione studente-studente",
    ],
    "B. Incoraggia l’apprendimento passivo"
  ),

  new Question(
    "21. Perché è importante fornire feedback immediato nell’apprendimento online?",
    [
      "A. Permette agli studenti di correggere gli errori in tempo reale",
      "B. Promuove la memorizzazione meccanica",
      "C. Incoraggia la dipendenza dalle valutazioni degli altri",
      "D. Limita la necessità di riflessione e analisi",
    ],
    "A. Permette agli studenti di correggere gli errori in tempo reale"
  ),

  new Question(
    "22. Perché è fondamentale la diversificazione delle strategie didattiche in un contesto inclusivo?",
    [
      "A. Per ignorare le diverse esigenze degli studenti.",
      "B. Per creare un ambiente di apprendimento ingiusto.",
      "C. Per garantire che tutti gli studenti possano apprendere in modo efficace.",
      "D. Per favorire la competizione tra gli studenti.",
    ],
    "C. Per garantire che tutti gli studenti possano apprendere in modo efficace."
  ),

  new Question(
    "23. Come può l’uso delle tecnologie assistive favorire l’apprendimento degli studenti con bisogni educativi speciali?",
    [
      "A. Promuovendo la dipendenza dalla tecnologia.",
      "B. Facilitando l’accesso ai contenuti e la partecipazione alle attività.",
      "C. Ignorando le esigenze specifiche degli studenti.",
      "D. Promuovendo l’uso esclusivo di risorse digitali.",
    ],
    "B. Facilitando l’accesso ai contenuti e la partecipazione alle attività."
  ),

  new Question(
    "24. Cosa significa adattare le attività di classe alle esigenze di ciascun studente?",
    [
      "A. Fornire lo stesso tipo di attività a tutti gli studenti.",
      "B. Modificare le attività in modo che siano accessibili e significative per tutti.",
      "C. Concentrarsi solo sulle esigenze degli studenti senza bisogni speciali.",
      "D. Creare attività separate per gli studenti con bisogni speciali.",
    ],
    "B. Modificare le attività in modo che siano accessibili e significative per tutti."
  ),

  new Question(
    "25. Qual è il vantaggio principale del lavoro di gruppo in un’aula inclusiva?",
    [
      "A. Incoraggia l’isolamento degli studenti.",
      "B. Favorisce la competizione tra gli studenti.",
      "C. Promuove la cooperazione e lo sviluppo delle competenze sociali.",
      "D. Ignora le esigenze degli studenti con bisogni speciali.",
    ],
    "C. Promuove la cooperazione e lo sviluppo delle competenze sociali."
  ),

  new Question(
    "26. Perché è importante fornire feedback costruttivo e tempestivo?",
    [
      "A. Per sottolineare solo gli errori degli studenti.",
      "B. Per aiutare gli studenti a riflettere sui loro progressi e a migliorare.",
      "C. Per promuovere un ambiente di apprendimento stressante.",
      "D. Per concentrarsi solo sui risultati accademici.",
    ],
    "B. Per aiutare gli studenti a riflettere sui loro progressi e a migliorare."
  ),

  new Question(
    "27. Come può la collaborazione con altri professionisti, come logopedisti o terapisti occupazionali, migliorare l’apprendimento degli studenti?",
    [
      "A. Limitando la responsabilità dell’insegnante.",
      "B. Concentrandosi solo sulle difficoltà degli studenti.",
      "C. Fornendo un supporto completo e mirato agli studenti.",
      "D. Promuovendo la dipendenza degli studenti da altri professionisti.",
    ],
    "C. Fornendo un supporto completo e mirato agli studenti."
  ),

  new Question(
    "28. Qual è l’obiettivo principale dell’apprendimento basato su progetti in un contesto inclusivo?",
    [
      "A. Concentrarsi solo sulla teoria e ignorare la pratica.",
      "B. Promuovere la competizione tra gli studenti.",
      "C. Sviluppare competenze come il pensiero critico e il lavoro di squadra.",
      "D. Separare gli studenti in base alle loro capacità.",
    ],
    "C. Sviluppare competenze come il pensiero critico e il lavoro di squadra."
  ),

  new Question(
    "29. Perché è importante personalizzare l’insegnamento in un contesto inclusivo?",
    [
      "A. Per promuovere l’ingiustizia e l’ineguaglianza.",
      "B. Per rispondere efficacemente alle diverse esigenze degli studenti.",
      "C. Per favorire la dipendenza degli studenti dall’insegnante.",
      "D. Per concentrarsi solo sugli studenti con bisogni speciali.",
    ],
    "B. Per rispondere efficacemente alle diverse esigenze degli studenti."
  ),

  new Question(
    "30. Come può il monitoraggio regolare dei progressi degli studenti contribuire a un insegnamento efficace?",
    [
      "A. Ignorando le esigenze degli studenti.",
      "B. Adattando l’insegnamento in base ai bisogni e ai progressi degli studenti.",
      "C. Concentrandosi solo sui risultati delle valutazioni.",
      "D. Creando un ambiente di apprendimento stressante.",
    ],
    "B. Adattando l’insegnamento in base ai bisogni e ai progressi degli studenti."
  ),

  new Question(
    "31. Perché è fondamentale sviluppare l’intelligenza emotiva degli studenti?",
    [
      "a) Per rendere l’apprendimento meno efficace.",
      "b) Per migliorare le capacità di relazione tra gli studenti.",
      "c) Per incrementare il livello di ansia in classe.",
      "d) Per concentrarsi solo sullo sviluppo intellettuale.",
    ],
    "b) Per migliorare le capacità di relazione tra gli studenti."
  ),

  new Question(
    "32. In che modo l’intelligenza emotiva dell’insegnante può influenzare la motivazione degli studenti?",
    [
      "a) Incrementando la pressione sul rendimento scolastico.",
      "b) Diminuendo l’interesse degli studenti nell’apprendimento.",
      "c) Promuovendo un ambiente di sostegno e incoraggiamento.",
      "d) Facilitando l’ignoranza delle emozioni degli studenti.",
    ],
    "c) Promuovendo un ambiente di sostegno e incoraggiamento."
  ),

  new Question(
    "33. Quali sono i vantaggi di essere un insegnante capace di pensare in modo creativo?",
    [
      "a) Limitare le opportunità di apprendimento per gli studenti.",
      "b) Ignorare le esigenze individuali degli studenti.",
      "c) Rendere l’apprendimento più dinamico e coinvolgente.",
      "d) Adottare un approccio rigido e inflessibile all’insegnamento.",
    ],
    "c) Rendere l’apprendimento più dinamico e coinvolgente."
  ),

  new Question(
    "34. Perché è importante integrare materiali didattici innovativi nel processo di insegnamento?",
    [
      "a) Per rendere l’apprendimento più monotono.",
      "b) Per favorire la comprensione e la memorizzazione dei concetti.",
      "c) Per limitare la partecipazione attiva degli studenti.",
      "d) Per promuovere l’apprendimento passivo.",
    ],
    "b) Per favorire la comprensione e la memorizzazione dei concetti."
  ),

  new Question(
    "35. Come può la creatività aiutare gli studenti con difficoltà di apprendimento?",
    [
      "a) Peggiorando il loro rendimento scolastico.",
      "b) Incrementando la frustrazione degli studenti.",
      "c) Offrendo nuove prospettive e approcci all’apprendimento.",
      "d) Riducendo la loro autostima.",
    ],
    "c) Offrendo nuove prospettive e approcci all’apprendimento."
  ),

  new Question(
    "36. In che modo l’insegnamento basato sulla risoluzione di problemi può preparare gli studenti per il futuro?",
    [
      "a) Limitando il loro pensiero critico.",
      "b) Fornendo loro risposte definitive a tutti i problemi.",
      "c) Sviluppando la loro capacità di affrontare sfide complesse.",
      "d) Ignorando la loro formazione accademica.",
    ],
    "c) Sviluppando la loro capacità di affrontare sfide complesse."
  ),

  new Question(
    "37. Qual è l’obiettivo principale del concetto di cittadinanza globale nell’educazione?",
    [
      "a) Promuovere l’egocentrismo.",
      "b) Favorire l’ignoranza delle questioni globali.",
      "c) Sviluppare la consapevolezza e la responsabilità nei confronti delle questioni mondiali.",
      "d) Limitare la partecipazione degli studenti alla comunità.",
    ],
    "c) Sviluppare la consapevolezza e la responsabilità nei confronti delle questioni mondiali."
  ),

  new Question(
    "38. Come può l’inclusione delle prospettive culturali e globali arricchire l’apprendimento degli studenti?",
    [
      "a) Limitando la loro comprensione del mondo.",
      "b) Promuovendo un ambiente di chiusura culturale.",
      "c) Espandendo la loro visione del mondo e promuovendo la tolleranza.",
      "d) Diminuendo la loro consapevolezza delle differenze culturali.",
    ],
    "c) Espandendo la loro visione del mondo e promuovendo la tolleranza."
  ),

  new Question(
    "39. Perché è importante sviluppare abilità di pensiero critico negli studenti?",
    [
      "a) Per limitare la loro abilità di risoluzione dei problemi.",
      "b) Per facilitare la memorizzazione meccanica dei fatti.",
      "c) Per aiutarli a valutare in modo critico le informazioni e prendere decisioni informate.",
      "d) Per promuovere il pensiero dogmatico e acritico.",
    ],
    "c) Per aiutarli a valutare in modo critico le informazioni e prendere decisioni informate."
  ),

  new Question(
    "40. Qual è uno dei principali benefici dell'apprendimento lungo tutto l'arco della vita?",
    [
      "a) Ridurre l'opportunità di acquisire nuove competenze.",
      "b) Mantenere un'approccio statico all'apprendimento.",
      "c) Mantenere la rilevanza personale e professionale.",
      "d) Focalizzarsi esclusivamente sull'istruzione formale.",
    ],
    "c) Mantenere la rilevanza personale e professionale."
  ),
];

var quiz = new Quiz(questionsSectionOne);

nextSectionBtn.addEventListener("click", () => {
  quiz.askedQuestionIndexes = [];
  quiz.questionIndex = 0;

  //   if (quiz.currentSectionIndex === 1) {
  //     quiz.questions = questionsSectionThree;
  //     quiz.currentSectionIndex = 2;
  //   } else {
  //     quiz.questions = questionsSectionTwo;
  //     quiz.currentSectionIndex = 1;
  //   }

  if (quiz.currentSectionIndex === 0) {
    quiz.questions = questionsSectionOne;
    quiz.currentSectionIndex = 1;
  } else if (quiz.currentSectionIndex === 1) {
    quiz.questions = questionsSectionTwo;
    quiz.currentSectionIndex = 2;
  } else if (quiz.currentSectionIndex === 2) {
    quiz.questions = questionsSectionThree;
    quiz.currentSectionIndex = 3;
  } else if (quiz.currentSectionIndex === 3) {
    quiz.questions = questionsSectionFour;
    quiz.currentSectionIndex = 4;
  } else if (quiz.currentSectionIndex === 4) {
    quiz.questions = questionsSectionFive;
    quiz.currentSectionIndex = 5;
  } else if (quiz.currentSectionIndex === 5) {
    quiz.questions = questionsSectionSix;
    quiz.currentSectionIndex = 6;
  } else if (quiz.currentSectionIndex === 6) {
    quiz.questions = questionsSectionSeven;
    quiz.currentSectionIndex = 7;
  } else {
  }

  quiz.currentQuestionIndex = Math.floor(Math.random() * quiz.questions.length);
  populate();
});

// display quiz
console.log("quiz: " + quiz);

populate();

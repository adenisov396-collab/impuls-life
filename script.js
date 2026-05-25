// Переключение ролей
function switchRole(role) {
  document.getElementById('studentView').style.display = role === 'student' ? 'block' : 'none';
  document.getElementById('tutorView').style.display = role === 'tutor' ? 'block' : 'none';
  document.getElementById('studentRoleBtn').classList.toggle('active', role === 'student');
  document.getElementById('tutorRoleBtn').classList.toggle('active', role === 'tutor');
}

// Открыть модальное окно опроса
function openSurveyModal() {
  const surveyModal = new bootstrap.Modal(document.getElementById('surveyModal'));
  surveyModal.show();
}

// Открыть детали студента (для куратора)
function openStudentDetail() {
  const detailModal = new bootstrap.Modal(document.getElementById('studentDetailModal'));
  detailModal.show();
}

// Обработка выбора ответа в опросе
document.addEventListener('DOMContentLoaded', function() {
  const surveyOptions = document.querySelectorAll('.survey-option');
  surveyOptions.forEach(btn => {
    btn.addEventListener('click', function() {
      // Убираем подсветку со всех вариантов
      surveyOptions.forEach(b => b.classList.remove('active', 'btn-primary'));
      // Подсвечиваем выбранный
      this.classList.add('active', 'btn-primary');
      
      const value = this.dataset.value;
      let message = '';
      if (value === 'good') {
        message = '👍 Отлично! Ты быстро адаптируешься. Продолжай участвовать в мероприятиях.';
      } else if (value === 'mid') {
        message = '💪 Привыкание — это нормально. Рекомендуем посетить кураторский час.';
      } else if (value === 'bad') {
        message = '❤️ Нам важно, чтобы тебе было комфортно. Куратор уже получил сигнал и предложит поддержку.';
      }
      
      setTimeout(() => {
        alert('Результат опроса:\n' + message);
        const modal = bootstrap.Modal.getInstance(document.getElementById('surveyModal'));
        modal.hide();
      }, 400);
    });
  });
});

// Профили дезадаптации
const problemProfiles = [
  {
    id: 'anxiety',
    name: 'Повышенная тревожность',
    threshold: (groupData) => groupData.highRiskPercent > 20,
    scenarios: [
      'Час доверия «Стресс под контроль»',
      'Мастер-класс «Дыхательные техники»',
      'Индивидуальные беседы по алгоритму «Первая помощь при панике»'
    ]
  },
  {
    id: 'social',
    name: 'Низкая социальная включённость',
    threshold: (groupData) => groupData.socialIsolationPercent > 25,
    scenarios: [
      'Игра на командообразование «Снежный ком»',
      'Кураторский час «Найди свою стаю»',
      'Проект «Старший друг» (наставничество)'
    ]
  },
  {
    id: 'motivation',
    name: 'Снижение учебной мотивации',
    threshold: (groupData) => groupData.lowMotivationPercent > 30,
    scenarios: [
      'Коуч-сессия «Мои цели в университете»',
      'Встреча с успешными выпускниками',
      'Чек-лист «Как полюбить учёбу»'
    ]
  }
];

// Функция диагностики (заглушка, берёт случайные данные)
function runDiagnostics() {
  // Имитируем аналитику по группе
  const fakeData = {
    highRiskPercent: Math.floor(Math.random() * 100),
    socialIsolationPercent: Math.floor(Math.random() * 100),
    lowMotivationPercent: Math.floor(Math.random() * 100)
  };

  // Проверяем, какие проблемы активны
  const activeProblems = problemProfiles.filter(p => p.threshold(fakeData));
  
  const alertDiv = document.getElementById('groupAlert');
  const alertTypeSpan = document.getElementById('alertType');
  const recContent = document.getElementById('recommendationContent');

  if (activeProblems.length > 0) {
    // Показываем алерт на дашборде
    alertDiv.classList.remove('d-none');
    alertTypeSpan.textContent = activeProblems.map(p => p.name).join(', ');
    
    // Заполняем вкладку "Рекомендации"
    let html = '';
    activeProblems.forEach(problem => {
      html += `<div class="mb-4">
        <h6 class="text-danger fw-bold">${problem.name}</h6>
        <ul class="list-group">`;
      problem.scenarios.forEach(s => {
        html += `<li class="list-group-item list-group-item-action">
          <i class="fa-solid fa-check-circle text-success me-2"></i>${s}
        </li>`;
      });
      html += `</ul></div>`;
    });
    recContent.innerHTML = html;
  } else {
    alertDiv.classList.add('d-none');
    recContent.innerHTML = '<p class="text-success"><i class="fa-solid fa-circle-check"></i> Группа в норме, системных проблем не выявлено.</p>';
  }
  
  // Переключаемся на вкладку рекомендаций
  document.querySelector('#tutorTabs button[data-bs-target="#tab-recommendations"]').click();
}

// Вспомогательная функция для перехода по ссылке в алерте
function switchToRecommendations() {
  document.querySelector('#tutorTabs button[data-bs-target="#tab-recommendations"]').click();
}

// Открыть модальное окно с картинкой
function openImageModal(imageSrc, title) {
  document.getElementById('imageModalImg').src = imageSrc;
  document.getElementById('imageModalTitle').textContent = title;
  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  modal.show();
}
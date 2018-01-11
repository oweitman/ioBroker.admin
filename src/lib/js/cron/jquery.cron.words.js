/*global jQueryCronWords:true */
'use strict';

var jQueryCronWords = {
    "April": {
		"en": "April",
		"de": "April",
		"ru": "Апр",
		"pt": "Abril",
		"nl": "April",
		"fr": "Avril",
		"it": "Aprile",
		"es": "Abril"
	},
    "Aug": {
		"en": "Aug",
		"de": "Aug",
		"ru": "Авг",
		"pt": "Ago",
		"nl": "Augustus",
		"fr": "Août",
		"it": "Agosto",
		"es": "Ago"
	},
    "CRON Every": {
		"en": "Every",
		"de": "Alle",
		"ru": "Каждые",
		"pt": "Cada",
		"nl": "Elk",
		"fr": "Chaque",
		"it": "Ogni",
		"es": "Cada"
	},
    "CRON Every day": {
		"en": "Every day",
		"de": "Jeden Tag",
		"ru": "Каждый день",
		"pt": "Todo dia",
		"nl": "Elke dag",
		"fr": "Tous les jours",
		"it": "Ogni giorno",
		"es": "Cada día"
	},
    "CRON Every hour": {
		"en": "Every hour",
		"de": "Jede Stunde",
		"ru": "Каждый час",
		"pt": "Toda hora",
		"nl": "Elk uur",
		"fr": "Toutes les heures",
		"it": "Ogni ora",
		"es": "Cada hora"
	},
    "CRON Every minute": {
		"en": "Every minute",
		"de": "Jede Minute",
		"ru": "Каждую минуту",
		"pt": "Todo minuto",
		"nl": "Elke minuut",
		"fr": "Chaque minute",
		"it": "Ogni minuto",
		"es": "Cada minuto"
	},
    "CRON Every month": {
		"en": "Every month",
		"de": "Jeden Monat",
		"ru": "Каждый месяц",
		"pt": "Todo mês",
		"nl": "Elke maand",
		"fr": "Chaque mois",
		"it": "Ogni mese",
		"es": "Cada mes"
	},
    "CRON Every second": {
		"en": "Every second",
		"de": "Jede Sekunde",
		"ru": "Каждую секунду",
		"pt": "Todo segundo",
		"nl": "Elke seconde",
		"fr": "Chaque seconde",
		"it": "Ogni secondo",
		"es": "Cada segundo"
	},
    "CRON Every week day": {
		"en": "Every week day",
		"de": "Jeden Wochentag",
		"ru": "Каждый день недели",
		"pt": "Todos os dias da semana",
		"nl": "Elke weekdag",
		"fr": "Tous les jours de la semaine",
		"it": "Ogni giorno della settimana",
		"es": "Todos los días de la semana"
	},
    "CRON day": {
		"en": "day",
		"de": "Tag",
		"ru": "день",
		"pt": "dia",
		"nl": "dag",
		"fr": "jour",
		"it": "giorno",
		"es": "día"
	},
    "CRON days": {
		"en": "days",
		"de": "Tage",
		"ru": "дней",
		"pt": "dias",
		"nl": "Dagen",
		"fr": "jours",
		"it": "giorni",
		"es": "dias"
	},
    "CRON hour": {
		"en": "hour",
		"de": "Stunde",
		"ru": "час",
		"pt": "hora",
		"nl": "uur",
		"fr": "heure",
		"it": "ora",
		"es": "hora"
	},
    "CRON hours": {
		"en": "hours",
		"de": "Stunden",
		"ru": "часа(ов)",
		"pt": "horas",
		"nl": "Uren",
		"fr": "heures",
		"it": "ore",
		"es": "horas"
	},
    "CRON minute": {
		"en": "minute",
		"de": "Minute",
		"ru": "минуту",
		"pt": "minuto",
		"nl": "minuut",
		"fr": "minute",
		"it": "Minuto",
		"es": "minuto"
	},
    "CRON minutes": {
		"en": "minutes",
		"de": "Minuten",
		"ru": "минут(ы)",
		"pt": "minutos",
		"nl": "notulen",
		"fr": "minutes",
		"it": "minuti",
		"es": "minutos"
	},
    "CRON month": {
		"en": "month",
		"de": "Monat",
		"ru": "месяц",
		"pt": "mês",
		"nl": "maand",
		"fr": "mois",
		"it": "mese",
		"es": "mes"
	},
    "CRON months": {
		"en": "months",
		"de": "Monate",
		"ru": "месяца",
		"pt": "meses",
		"nl": "maanden",
		"fr": "mois",
		"it": "mesi",
		"es": "meses"
	},
    "CRON second": {
		"en": "second",
		"de": "Sekunde",
		"ru": "секунду",
		"pt": "segundo",
		"nl": "tweede",
		"fr": "seconde",
		"it": "secondo",
		"es": "segundo"
	},
    "CRON seconds": {
		"en": "seconds",
		"de": "Sekunden",
		"ru": "секунд(ы)",
		"pt": "segundos",
		"nl": "Seconden",
		"fr": "secondes",
		"it": "secondi",
		"es": "segundos"
	},
    "CRON Clear": {
		"en": "Clear",
		"de": "Löschen",
		"ru": "Clear",
		"pt": "Limpar",
		"nl": "Duidelijk",
		"fr": "Effacer",
		"it": "Pulito",
		"es": "Limpio"
	},
    "CRON Day of Month": {
		"en": "Day of Month",
		"de": "Monatstag",
		"ru": "День месяца",
		"pt": "Dia do mês",
		"nl": "Dag van de maand",
		"fr": "Jour du mois",
		"it": "Giorno del mese",
		"es": "Dia del mes"
		},
    "CRON Day of Week": {
		"en": "Day of Week",
		"de": "Wochentag",
		"ru": "Дни недели",
		"pt": "Dia da semana",
		"nl": "Dag van de week",
		"fr": "Jour de la semaine",
		"it": "Giorno della settimana",
		"es": "Día de la semana"
	},
    "CRON dialog": {
		"en": "CRON dialog",
		"de": "CRON Dialog",
        "ru": "CRON диалог",
        "pt": "CRON diálogo",
        "nl": "CRON dialoog",
        "fr": "Dialogue CRON",
        "it": "CRON dialogo",
        "es": "CRON diálogo"
    },
    "CRON Type": {
        "en": "Type",
        "de": "Art",
        "ru": "Тип",
        "pt": "Tipo",
        "nl": "Type",
        "fr": "Type",
        "it": "Genere",
        "es": "Tipo"
    },
    "CRON Apply": {
        "en": "Apply",
        "de": "Anwenden",
        "ru": "Перенять",
        "pt": "Aplique",
        "nl": "Toepassen",
        "fr": "Appliquer",
        "it": "Applicare",
        "es": "Aplicar"
    },
    "CRON Cancel": {
        "en": "Cancel",
        "de": "Abbrechen",
        "ru": "Отмена",
        "pt": "Cancelar",
        "nl": "Annuleer",
        "fr": "Annuler",
        "it": "Annulla",
        "es": "Cancelar"
    },
    "Dec": {
		"en": "Dec",
		"de": "Dez",
		"ru": "Дек",
		"pt": "Dec",
		"nl": "DEC",
		"fr": "Déc.",
		"it": "Dec",
		"es": "Dic"
	},
    "Each day": {
		"en": "Each Day",
		"de": "Jeden Tag",
		"ru": "Каждый день",
		"pt": "Cada dia",
		"nl": "Elke dag",
		"fr": "Chaque jour",
		"it": "Ogni giorno",
		"es": "Cada día"
	},
    "Each month": {
		"en": "Each Month",
		"de": "Jeden Monat",
		"ru": "Каждый месяц",
		"pt": "Cada mês",
		"nl": "Elke maand",
		"fr": "Chaque mois",
		"it": "Ogni mese",
		"es": "Cada mes"
	},
    "CRON Each selected day": {
		"en": "Each selected Day",
		"de": "Jeden ausgewählten Tag",
		"ru": "Каждый выбранный день",
		"pt": "Cada dia selecionado",
		"nl": "Elke geselecteerde dag",
		"fr": "Chaque jour sélectionné",
		"it": "Ogni giorno selezionato",
		"es": "Cada día seleccionado"
	},
    "CRON Each selected hour": {
		"en": "Each Selected Hour",
		"de": "Jede ausgewählte Stunde",
		"ru": "Каждый выбранный час",
		"pt": "Cada Hora Selecionada",
		"nl": "Elk geselecteerd uur",
		"fr": "Chaque heure sélectionnée",
		"it": "Ogni ora selezionata",
		"es": "Cada hora seleccionada"
	},
    "CRON Each selected minute": {
		"en": "Each selected minute",
		"de": "Jede ausgewählte Minute",
		"ru": "Каждую выбранную минуту",
		"pt": "Cada minuto selecionado",
		"nl": "Elke geselecteerde minuut",
		"fr": "Chaque minute sélectionnée",
		"it": "Ogni minuto selezionato",
		"es": "Cada minuto seleccionado"
	},
    "CRON Each selected month": {
		"en": "Each selected month",
		"de": "Jeden ausgewählten Monat",
		"ru": "Каждый выбранный месяц",
		"pt": "Cada mês selecionado",
		"nl": "Elke geselecteerde maand",
		"fr": "Chaque mois sélectionné",
		"it": "Ogni mese selezionato",
		"es": "Cada mes seleccionado"
	},
    "CRON Each selected second": {
		"en": "Each selected second",
		"de": "Jede ausgewählte Sekunde",
		"ru": "Каждую выбранную секунду",
		"pt": "Cada segundo selecionado",
		"nl": "Elke geselecteerde seconde",
		"fr": "Chaque seconde sélectionnée",
		"it": "Ogni secondo selezionato",
		"es": "Cada segundo seleccionado"
	},
    "CRON Each selected week day": {
		"en": "Each selected week day",
		"de": "Jeden ausgewählten Wochentag",
		"ru": "Каждый выбранный день недели",
		"pt": "Cada dia da semana selecionado",
		"nl": "Elke geselecteerde weekdag",
		"fr": "Chaque jour de la semaine sélectionné",
		"it": "Ogni giorno della settimana selezionato",
		"es": "Cada día de la semana seleccionado"
	},
    "CRON Every %s seconds": {
		"en": "Every %s seconds",
		"de": "Alle %s Sekunden",
		"ru": "Каждые %s секунд(ы)",
		"pt": "Todos os %s segundos",
		"nl": "Elke% s seconden",
		"fr": "Chaque %s seconde",
		"it": "Ogni %s secondi",
		"es": "Cada %s segundos"
	},
    "CRON Every n hours": {
		"en": "Every n Hours",
		"de": "Alle N Stunden",
		"ru": "Каждые N часов",
		"pt": "Todas as horas",
		"nl": "Every n Hours",
		"fr": "Toutes les n heures",
		"it": "Ogni n ore",
		"es": "Cada n horas"
	},
    "CRON Every n minutes": {
		"en": "Every n minutes",
		"de": "Alle N Minuten",
		"ru": "Каждые N минут",
		"pt": "A cada n minutos",
		"nl": "Elke n minuten",
		"fr": "Toutes les n minutes",
		"it": "Ogni n minuti",
		"es": "Cada n minutos"
	},
    "CRON Every n seconds": {
		"en": "Every n seconds",
		"de": "Alle N Sekunden",
		"ru": "Каждые N секунд",
		"pt": "Cada n segundos",
		"nl": "Elke n seconden",
		"fr": "Toutes les n secondes",
		"it": "Ogni n secondi",
		"es": "Cada n segundos"
	},
    "Feb": {
		"en": "Feb",
		"de": "Feb",
		"ru": "Фев",
		"pt": "Feb",
		"nl": "Februari",
		"fr": "Févr.",
		"it": "Febbraio",
		"es": "Feb"
	},
    "Friday": {
		"en": "Friday",
		"de": "Freitag",
		"ru": "Пятница",
		"pt": "Sexta-feira",
		"nl": "Vrijdag",
		"fr": "Vendredi",
		"it": "Venerdì",
		"es": "Viernes"
	},
    "CRON Hour": {
		"en": "Hour",
		"de": "Stunden",
		"ru": "Часы",
		"pt": "Hora",
		"nl": "Uur",
		"fr": "Heure",
		"it": "Ora",
		"es": "Hora"
	},
    "Jan": {
		"en": "Jan",
		"de": "Jan",
		"ru": "Янв",
		"pt": "Jan",
		"nl": "Jan",
		"fr": "Janv.",
		"it": "Jan",
		"es": "Ene"
	},
    "July": {
		"en": "July",
		"de": "Juli",
		"ru": "Июль",
		"pt": "Julho",
		"nl": "Juli",
		"fr": "Juillet",
		"it": "Luglio",
		"es": "Julio"
	},
    "June": {
		"en": "June",
		"de": "Juni",
		"ru": "Июнь",
		"pt": "Junho",
		"nl": "Juni",
		"fr": "Juin",
		"it": "Giugno",
		"es": "Junio"
	},
    "March": {
		"en": "March",
		"de": "März",
		"ru": "Март",
		"pt": "Marcha",
		"nl": "Maart",
		"fr": "Mars",
		"it": "Marzo",
		"es": "Marzo"
	},
    "May": {
		"en": "May",
		"de": "Mai",
		"ru": "Mай",
		"pt": "Maio",
		"nl": "Mei",
		"fr": "Mai",
		"it": "Maggio",
		"es": "Mayo"
	},
    "CRON Minute": {
		"en": "Minute",
		"de": "Minuten",
		"ru": "Минуты",
		"pt": "Minuto",
		"nl": "Minuut",
		"fr": "Minute",
		"it": "Minuto",
		"es": "Minuto"
	},
    "Monday": {
		"en": "Monday",
		"de": "Montag",
		"ru": "Понедельник",
		"pt": "Segunda-feira",
		"nl": "Maandag",
		"fr": "Lundi",
		"it": "Lunedi",
		"es": "Lunes"
	},
    "CRON Month": {
		"en": "Month",
		"de": "Monate",
		"ru": "Месяцы",
		"pt": "Mês",
		"nl": "Maand",
		"fr": "Mois",
		"it": "Mese",
		"es": "Mes"
	},
    "Nov": {
		"en": "Nov",
		"de": "Nov",
		"ru": "Ноя",
		"pt": "Nov",
		"nl": "November",
		"fr": "Nov.",
		"it": "Novembre",
		"es": "Nov"
	},
    "Oct": {
		"en": "Oct",
		"de": "Okt",
		"ru": "Окт",
		"pt": "Oct",
		"nl": "Oct",
		"fr": "Oct.",
		"it": "Ottobre",
		"es": "Oct"
	},
    "Saturday": {
		"en": "Saturday",
		"de": "Samstag",
		"ru": "Суббота",
		"pt": "Sábado",
		"nl": "Zaterdag",
		"fr": "Samedi",
		"it": "Sabato",
		"es": "Sábado"
	},
    "CRON Second": {
		"en": "Second",
		"de": "Sekunden",
		"ru": "Секунды",
		"pt": "Segundo",
		"nl": "Tweede",
		"fr": "Seconde",
		"it": "Secondo",
		"es": "Segundo"
	},
    "Sept": {
		"en": "Sept",
		"de": "Sept",
		"ru": "Сен",
		"pt": "Sept",
		"nl": "September",
		"fr": "Sept.",
		"it": "Settembre",
		"es": "Sept"
	},
    "Sunday": {
		"en": "Sunday",
		"de": "Sonntag",
		"ru": "Воскресение",
		"pt": "Domingo",
		"nl": "Zondag",
		"fr": "Dimanche",
		"it": "Domenica",
		"es": "Domingo"
	},
    "Thursday": {
		"en": "Thursday",
		"de": "Donnerstag",
		"ru": "Четверг",
		"pt": "Quinta-feira",
		"nl": "Donderdag",
		"fr": "Jeudi",
		"it": "Giovedi",
		"es": "Jueves"
	},
    "Tuesday": {
		"en": "Tuesday",
		"de": "Dienstag",
		"ru": "Вторник",
		"pt": "Terça",
		"nl": "Dinsdag",
		"fr": "Mardi",
		"it": "Martedì",
		"es": "Martes"
	},
    "CRON Use seconds": {
		"en": "Use seconds",
		"de": "Benutzen Sekunden",
		"ru": "Задействовать секунды",
		"pt": "Use segundos",
		"nl": "Gebruik seconden",
		"fr": "Utiliser les secondes",
		"it": "Usa secondi",
		"es": "Usar segundos"
	},
    "Wednesday": {
		"en": "Wednesday",
		"de": "Mittwoch",
		"ru": "Среда",
		"pt": "Quarta-feira",
		"nl": "Woensdag",
		"fr": "Mercredi",
		"it": "Mercoledì",
		"es": "Miércoles"
	},
    "never": {
		"en": "Never",
		"de": "Nie",
		"ru": "Никогда",
		"pt": "Nunca",
		"nl": "Nooit",
		"fr": "Jamais",
		"it": "Mai",
		"es": "Nunca"
	},
};
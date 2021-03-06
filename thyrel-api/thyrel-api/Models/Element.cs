﻿using System;
using System.Collections.Generic;

namespace thyrel_api.Models
{
    public class Element
    {
        private Element(int step, int creatorId, int initiatorId, int sessionId)
        {
            Step = step;
            CreatedAt = DateTime.Now;
            CreatorId = creatorId;
            InitiatorId = initiatorId;
            SessionId = sessionId;
        }

        public Element(int step, int creatorId, int initiatorId, int sessionId, ElementType type)
            : this(step, creatorId, initiatorId, sessionId)
        {
            Type = type;
            if (type == ElementType.Sentence)
                Text = "";
            else if (type == ElementType.Drawing)
                DrawImage = "";
        }

        public int Id { get; set; }
        public int Step { get; set; }
        public ElementType Type { get; set; }
        public string Text { get; set; }
        public string DrawImage { get; set; }
        public int? DrawingId { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }


        public int CreatorId { get; set; }
        public Player Creator { get; set; }

        public int InitiatorId { get; set; }
        public Player Initiator { get; set; }

        public int SessionId { get; set; }
        public Session Session { get; set; }

        public virtual List<Reaction> Reactions { get; set; }

        public bool IsFinish()
        {
            return FinishAt != null;
        }
    }
}
﻿using System;

namespace thyrel_api.Models.DTO
{
    public class ElementStepDto
    {
        public ElementStepDto(ElementDto element, ElementDto parent = null)
        {
            Id = element.Id;
            Step = element.Step;
            Type = element.Type;
            Text = element.Text;
            FinishAt = element.FinishAt;
            CreatedAt = element.CreatedAt;
            SessionId = element.SessionId;
            Parent = parent;
        }

        public int Id { get; set; }
        public int Step { get; set; }
        public ElementType Type { get; set; }
        public string Text { get; set; }
        public DateTime? FinishAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public int SessionId { get; set; }
        public ElementDto Parent { get; set; }
    }
}
package com.example.banque_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double montant;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private TypeTransaction type;

    @ManyToOne
    @JoinColumn(name = "compte_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Compte compte;

    public Transaction() {

    }

}
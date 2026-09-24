# Alizé Prospect AI

Je souhaite créer un MVP web professionnel pour ALIZÉ INTERNATIONAL.

CONTEXTE MÉTIER

Alizé International est une agence spécialisée dans le voyage d’affaires et l’événementiel. Pour ce MVP, il faut travailler UNIQUEMENT sur le volet :

PROSPECTION ÉVÉNEMENTIELLE ASSISTÉE PAR IA

L’objectif de la plateforme est de montrer comment un agent IA pourrait aider l’équipe commerciale à :

- rechercher des entreprises cibles ;

- détecter des opportunités événementielles ;

- filtrer les prospects selon plusieurs critères ;

- identifier les prospects prioritaires ;

- attribuer un score aux opportunités ;

- consulter les signaux détectés ;

- identifier les bons interlocuteurs ;

- générer des messages de prospection ;

- suivre le traitement commercial des opportunités.

IMPORTANT :

Ce projet est uniquement un MVP FRONT-END.

NE PAS créer :

- backend ;

- base de données réelle ;

- API ;

- authentification réelle ;

- scraping réel ;

- connexion LinkedIn ;

- connexion email ;

- connexion WhatsApp ;

- workflow externe ;

- intégration CRM ;

- webhook ;

- Supabase ;

- Firebase ;

- serveur ;

- logique backend.

Toutes les données doivent être simulées avec une MOCK DATA riche et réaliste directement dans le front-end.

Toutes les interactions doivent fonctionner localement côté front-end.

==================================================

1. OBJECTIF DE L’EXPÉRIENCE UTILISATEUR

==================================================

L’utilisateur doit comprendre immédiatement le processus :

1. Je définis mes critères de prospection

2. L’agent IA recherche des entreprises pertinentes

3. L’agent analyse plusieurs signaux

4. Il identifie des opportunités événementielles

5. Il calcule un score

6. Je consulte les prospects prioritaires

7. Je consulte les décideurs identifiés

8. Je génère un message de prospection

9. Je change le statut de l’opportunité

10. Je suis mes opportunités dans le tableau de bord

Le parcours doit être TRÈS CLAIR visuellement.

Créer notamment un composant horizontal "Processus de prospection" :

Ciblage

→ Recherche IA

→ Analyse

→ Qualification

→ Scoring

→ Prospection

Utiliser des icônes, animations légères et états visuels.

==================================================

2. DESIGN GÉNÉRAL

==================================================

Créer un dashboard SaaS premium, moderne, élégant et très professionnel.

Style :

- SaaS B2C premium ;

- corporate ;

- moderne ;

- interface claire ;

- légère inspiration intelligence artificielle ;

- pas d’esthétique trop futuriste ;

- beaucoup d’espace ;

- excellente hiérarchie visuelle ;

- cartes avec ombres légères ;

- radius modernes ;

- animations discrètes.

Palette recommandée :

Fond principal :

#F7F9FC

Sidebar :

#101827 ou #11162A

Bleu principal :

#2563EB

Bleu secondaire :

#3B82F6

Cyan / accent IA :

#14B8A6

Vert succès :

#16A34A

Orange / attention :

#F59E0B

Rouge :

#EF4444

Texte principal :

#172033

Texte secondaire :

#667085

Certaines zones peuvent utiliser des gradients bleu/cyan très subtils.

IMPORTANT :

L’interface ne doit pas paraître générique ou vide.

Créer une vraie identité visuelle.

Ajouter dans le header :

ALIZÉ INTERNATIONAL

Sous-titre :

Prospection Événementielle IA

Ajouter éventuellement un petit badge :

MVP DEMO

==================================================

3. STRUCTURE DE LA SIDEBAR

==================================================

SIDEBAR :

PILOTAGE

- Tableau de bord

PROSPECTION

- Opportunités

- Prospects

- Nouvelle recherche

VEILLE

- Sources de veille

- Mots-clés & typologies

CONFIGURATION

- Grille de scoring

- Ciblage prioritaire

- Alertes

En bas de sidebar :

- profil utilisateur fictif ;

- avatar ;

- "Sophie Martin"

- "Responsable Commerciale"

La sidebar doit avoir :

- icônes ;

- état actif ;

- hover ;

- animation subtile ;

- possibilité de collapse sur desktop si pertinent.

==================================================

4. PAGE TABLEAU DE BORD

==================================================

Créer un tableau de bord riche.

Header :

Bonjour Sophie,

Voici les nouvelles opportunités détectées par votre agent de prospection.

Ajouter un petit indicateur :

Agent IA actif

Dernière analyse : il y a 12 min

Créer 5 KPI :

1. Opportunités détectées

48

+12 cette semaine

2. Priorité A

12

+4 cette semaine

3. Nouveaux prospects

23

4. À contacter

9

5. Taux de qualification

68 %

Ajouter des animations de compteur au chargement.

Créer ensuite une section :

PROCESSUS DE PROSPECTION IA

Afficher horizontalement :

Ciblage

→ 1 248 entreprises analysées

Recherche

→ 163 entreprises retenues

Analyse IA

→ 74 signaux détectés

Qualification

→ 48 opportunités

Priorité A

→ 12 opportunités

Ajouter des animations progressives ou une timeline animée.

Ajouter ensuite :

GRAPHIQUE 1

Opportunités détectées sur les 30 derniers jours

Graphique line chart.

GRAPHIQUE 2

Répartition par type d’événement

- Séminaire : 28 %

- Convention : 21 %

- Team building : 18 %

- Incentive : 15 %

- Conférence : 10 %

- Lancement produit : 8 %

Graphique donut.

GRAPHIQUE 3

Opportunités par pays

- France

- Espagne

- Belgique

- Royaume-Uni

- Allemagne

- Émirats arabes unis

Bar chart.

Ajouter ensuite :

OPPORTUNITÉS PRIORITAIRES

Table compacte avec :

Entreprise

Pays

Secteur

Opportunité

Score

Statut

Action

Exemples :

Nova Pharma

France

Pharmaceutique

Convention internationale

94

Priorité A

TechVision Europe

Espagne

Technologie

Team Building

91

Priorité A

Finora Group

Belgique

Finance

Séminaire direction

89

À contacter

Luxe & Co

France

Luxe

Lancement produit

87

À qualifier

Bouton :

Voir toutes les opportunités

==================================================

5. PAGE NOUVELLE RECHERCHE

==================================================

Cette page est extrêmement importante.

Titre :

Nouvelle prospection événementielle

Sous-titre :

Définissez votre cible et laissez l’agent IA identifier les opportunités événementielles les plus pertinentes.

Créer un formulaire premium.

CRITÈRES :

Marchés / Pays

multi-select :

- France

- Espagne

- Belgique

- Royaume-Uni

- Allemagne

- Suisse

- Italie

- Pays-Bas

- Émirats arabes unis

- Arabie Saoudite

Villes

multi-select :

Paris

Lyon

Marseille

Madrid

Barcelone

Bruxelles

Londres

Berlin

Dubaï

Genève

Amsterdam

Secteurs d’activité :

- Pharmaceutique

- Technologie

- Finance

- Assurance

- Automobile

- Luxe

- Retail

- Agroalimentaire

- Industrie

- Énergie

- Conseil

- Télécommunications

Taille d’entreprise :

- 10–50

- 50–200

- 200–500

- 500–1 000

- 1 000–5 000

- +5 000

Types d’événement :

- Séminaire

- Convention

- Team building

- Incentive

- Conférence

- Salon professionnel

- Lancement produit

- Voyage corporate

- Réunion de direction

- Anniversaire entreprise

Horizon :

30 jours

60 jours

90 jours

6 mois

12 mois

Zone de mots-clés :

annual meeting

company retreat

international convention

incentive travel

corporate event

product launch

team building

Permettre :

- d’ajouter un mot-clé ;

- supprimer un mot-clé ;

- afficher les mots-clés comme des chips.

Créer sur le côté droit un résumé dynamique :

VOTRE CIBLAGE

Exemple :

2 pays

3 villes

4 secteurs

Entreprises : +200 employés

3 types d’événements

Horizon : 90 jours

Créer gros bouton principal :

Lancer la recherche IA

Bouton secondaire :

Réinitialiser

==================================================

6. ANIMATION DE RECHERCHE IA

==================================================

Lorsque l’utilisateur clique sur :

Lancer la recherche IA

NE PAS afficher immédiatement le résultat.

Afficher un écran / modal de progression élégant pendant quelques secondes.

Étapes animées :

✓ Analyse des critères

✓ Identification des entreprises correspondant à la cible

✓ Analyse des signaux événementiels

✓ Recherche des décideurs potentiels

✓ Qualification des opportunités

✓ Calcul du scoring

Créer une progression :

0 %

20 %

42 %

68 %

85 %

100 %

Puis afficher :

Analyse terminée

24 opportunités identifiées

7 opportunités Priorité A

18 décideurs identifiés

Bouton :

Afficher les résultats

Quand l’utilisateur clique dessus, rediriger vers la page Opportunités avec une liste filtrée simulée.

==================================================

7. PAGE OPPORTUNITÉS

==================================================

Créer une page très riche avec beaucoup de mock data.

Header :

Opportunités

Sous-titre :

Opportunités détectées et qualifiées par votre agent IA.

Afficher les statuts sous forme d’onglets :

Toutes 48

Priorité A 12

À qualifier 15

À contacter 9

En cours 8

Archivées / closes 4

Créer une table professionnelle.

COLONNES :

Checkbox

Entreprise

Opportunité

Pays

Ville

Secteur

Taille

Signal détecté

Score

Statut

Détection

Actions

Créer au minimum 25 enregistrements de mock data.

Entreprises fictives mais réalistes :

Nova Pharma

TechVision Europe

Finora Group

Luxe & Co

Atlas Automotive Europe

MedicaNova

GreenTech Solutions

Vertex Consulting

Digital Horizon

Altura Finance

BioHealth Europe

Nexa Retail

Solaris Energy

Apex Technologies

Prime Insurance

BlueWave Consulting

EuroMed Solutions

Global Retail Partners

Visionary Labs

Urban Mobility Group

etc.

Utiliser différents pays, villes, secteurs et événements.

Exemples de signaux :

- Croissance rapide des effectifs

- Ouverture d’un nouveau bureau

- Nouvelle implantation internationale

- Recrutement massif

- Anniversaire d’entreprise

- Lancement d’une nouvelle gamme

- Participation à un salon

- Communication autour d’un événement corporate

- Expansion internationale

- Nouvelle direction

- Levée de fonds

- Fusion / acquisition

- Nouvelle stratégie RH

Créer un score sur 100.

Score :

80–100 = badge vert / Priorité A

60–79 = orange / Priorité B

<60 = gris / À qualifier

==================================================

8. FILTRES TABLE OPPORTUNITÉS

==================================================

Créer des filtres réellement fonctionnels côté front-end.

Filtres :

Recherche entreprise

Pays

Ville

Secteur

Taille entreprise

Type événement

Score minimum

Score maximum

Statut

Date de détection

Bouton :

Plus de filtres

Bouton :

Réinitialiser

Créer aussi un TRI sur les colonnes :

Entreprise

Pays

Score

Date

Taille

ASC / DESC.

Créer une pagination fictive :

1

2

3

Suivant

Sélecteur :

10 / page

25 / page

50 / page

==================================================

9. ACTIONS SUR LES ENREGISTREMENTS

==================================================

Chaque ligne doit avoir un menu "..."

Actions :

Voir le détail

Passer en priorité A

Marquer à qualifier

Marquer à contacter

Passer en cours

Ajouter une note

Générer un message

Archiver

Créer des interactions front-end fonctionnelles.

Exemple :

si l’utilisateur sélectionne "Archiver", le statut de la ligne change immédiatement en "Archivée".

Si l’utilisateur clique sur "Ajouter une note", ouvrir une modal.

Si l’utilisateur clique sur "Générer un message", ouvrir une modal avec un message généré fictif.

Ajouter également les actions groupées lorsque plusieurs checkbox sont sélectionnées :

Changer le statut

Ajouter à Priorité A

Archiver

Exporter sélection

L’export peut être simulé.

Afficher toast :

"8 opportunités sélectionnées"

==================================================

10. DÉTAIL D’UNE OPPORTUNITÉ

==================================================

Quand on clique sur une entreprise, ouvrir une PAGE DÉTAIL.

Ne pas utiliser uniquement une petite popup.

Exemple :

Nova Pharma

Paris, France

Pharmaceutique

500–1 000 employés

Score :

94 / 100

Badge :

PRIORITÉ A

Créer plusieurs sections.

SECTION 1

Résumé IA

Exemple :

Nova Pharma présente plusieurs signaux indiquant un potentiel besoin événementiel à court ou moyen terme. L’entreprise connaît actuellement une phase d’expansion européenne et a récemment renforcé ses équipes commerciales et managériales.

Opportunité estimée :

Convention internationale / Séminaire de direction

Destination potentielle :

Marrakech, Maroc

Horizon :

3–6 mois

SECTION 2

Pourquoi cette opportunité ?

Créer plusieurs cartes :

+25

Expansion internationale

+20

Croissance des effectifs

+18

Actualité événementielle

+15

Secteur prioritaire

+10

Décideur identifié

Score final :

94 / 100

SECTION 3

Signaux détectés

Timeline :

Il y a 4 jours

Ouverture d’une nouvelle filiale en Espagne

Il y a 12 jours

Recrutement de 34 collaborateurs

Il y a 18 jours

Publication liée à la nouvelle stratégie internationale

Il y a 25 jours

Participation à un salon européen

SECTION 4

Entreprise

Site :

www.novapharma.example

Secteur :

Pharmaceutique

Effectif :

820

Pays :

France

Ville :

Paris

Implantations :

France, Espagne, Belgique

SECTION 5

Contacts recommandés

Créer plusieurs contacts mockés.

Sophie Martin

Event Manager

Décideur principal

Score contact : 92 %

Julien Bernard

Marketing Director

Influenceur

85 %

Sarah Dupont

HR Director

Influenceur

78 %

Actions :

Générer un email

Générer un message LinkedIn

Voir le profil

Ne pas connecter réellement LinkedIn.

==================================================

11. ASSISTANT IA DE PROSPECTION

==================================================

Dans le détail prospect, créer un panneau :

Assistant de prospection IA

Actions rapides :

Résumer l’opportunité

Générer un email

Générer un message LinkedIn

Préparer un argumentaire

Identifier le meilleur décideur

Préparer un script d’appel

Lorsque l’utilisateur clique sur une action, générer du texte prédéfini dynamique à partir de la mock data du prospect.

Exemple :

EMAIL

Objet :

Organisation de vos prochains événements corporate

Bonjour Sophie,

Je me permets de vous contacter suite aux développements récents de Nova Pharma...

Boutons :

Copier

Régénérer

Modifier

Fermer

"Régénérer" doit proposer une variante différente parmi plusieurs modèles simulés.

Ajouter un sélecteur de ton :

Professionnel

Court & direct

Premium

Chaleureux

==================================================

12. PAGE PROSPECTS

==================================================

Créer une page séparée :

Prospects

Objectif :

base des entreprises détectées même sans opportunité confirmée.

KPI :

163 entreprises surveillées

48 opportunités actives

72 décideurs identifiés

26 nouveaux cette semaine

Table :

Entreprise

Pays

Ville

Secteur

Taille

Décideurs

Opportunités

Score potentiel

Dernière analyse

Actions

Créer 25+ entreprises en mock data.

Filtres :

Pays

Secteur

Taille

Score

Opportunité détectée oui/non

Actions :

Voir entreprise

Créer opportunité

Ajouter note

Mettre en surveillance

Archiver

==================================================

13. SOURCES DE VEILLE

==================================================

Page :

Sources de veille

Créer des cartes :

Sites corporate

Actualités entreprises

Réseaux sociaux professionnels

Communiqués de presse

Offres d’emploi

Salons professionnels

Médias économiques

Bases entreprises

Pour chaque source :

Nom

Description

Statut actif/inactif

Nombre de signaux

Dernière analyse

Exemple :

Actualités entreprises

Actif

184 sources analysées

36 signaux cette semaine

Dernière analyse :

12 min

Permettre d’activer / désactiver visuellement chaque source.

Aucune vraie intégration.

==================================================

14. MOTS-CLÉS & TYPOLOGIES

==================================================

Créer deux onglets.

ONGLET 1

Mots-clés

Table :

Mot-clé

Catégorie

Langue

Occurrences

Statut

Actions

Mock :

annual meeting

Convention

EN

28

Actif

séminaire entreprise

Séminaire

FR

41

Actif

company retreat

Team building

EN

17

Actif

Créer bouton :

Ajouter un mot-clé

Modal fonctionnelle.

ONGLET 2

Typologies d’événements

Créer des cartes :

Séminaire

Convention

Team Building

Incentive

Conférence

Salon

Lancement produit

Voyage corporate

Anniversaire entreprise

Chaque typologie peut être activée / désactivée.

==================================================

15. GRILLE DE SCORING

==================================================

Créer une page de configuration du scoring.

Titre :

Grille de scoring

Sous-titre :

Configurez les critères utilisés par l’agent pour prioriser les opportunités.

Créer critères :

Secteur prioritaire

+20 points

Pays prioritaire

+15

Taille entreprise > 200

+15

Signal événementiel récent

+25

Décideur identifié

+15

Dimension internationale

+10

Permettre de modifier les valeurs avec input numérique.

Afficher à droite :

SIMULATION DE SCORE

Nova Pharma

Secteur prioritaire

+20

Pays prioritaire

+15

Entreprise > 200

+15

Signal fort

+25

Décideur identifié

+15

International

+10

TOTAL

100 / 100

Créer règles :

80–100

Priorité A

60–79

Priorité B

0–59

À qualifier

==================================================

16. CIBLAGE PRIORITAIRE

==================================================

Créer une page :

Ciblage prioritaire

4 sections :

PAYS PRIORITAIRES

France

Belgique

Espagne

Royaume-Uni

Émirats arabes unis

VILLES PRIORITAIRES

Paris

Lyon

Bruxelles

Madrid

Barcelone

Londres

Dubaï

SECTEURS PRIORITAIRES

Pharma

Finance

Tech

Luxe

Automobile

TAILLES PRIORITAIRES

200–500

500–1 000

1 000–5 000

+5 000

Permettre :

ajouter

supprimer

activer

désactiver

Tout doit rester local.

==================================================

17. ALERTES

==================================================

Créer une page :

Alertes

Créer plusieurs règles fictives.

Exemple :

Priorité A détectée

Quand score >= 80

Notification plateforme

Email

Actif

Autre règle :

Nouvelle opportunité Pharma en France

Secteur = Pharma

Pays = France

Actif

Autre :

Nouvelle opportunité Convention / Incentive

Actif

Bouton :

Créer une alerte

Modal comprenant :

Nom alerte

Pays

Secteur

Événement

Score minimum

Canal fictif

Destinataire

Les notifications ne doivent pas être réellement envoyées.

==================================================

18. MOCK DATA

==================================================

IMPORTANT :

Créer une mock data très riche.

Pas seulement 4 ou 5 lignes.

Minimum recommandé :

25 à 40 opportunités

25 à 40 prospects

20 contacts

10 sources

15 mots-clés

10 alertes / configurations

Varier :

pays

villes

secteurs

entreprises

taille

score

statuts

dates

types d’événements

signaux

décideurs

Les données doivent avoir l’air crédibles et différentes.

==================================================

19. INTERACTIONS FRONT-END

==================================================

Je souhaite que le MVP soit vraiment interactif.

Implémenter en local :

- recherche ;

- filtres ;

- tris ;

- pagination ;

- sélection checkbox ;

- actions groupées ;

- menus dropdown ;

- changement de statut ;

- activation/désactivation ;

- formulaires ;

- modals ;

- drawer si pertinent ;

- tabs ;

- accordions ;

- ajout de notes ;

- génération de texte fictive ;

- copie dans le presse-papier ;

- tooltips ;

- notifications toast ;

- breadcrumb ;

- boutons retour ;

- ajout/suppression de critères ;

- reset filtres ;

- compteurs dynamiques ;

- graphiques interactifs ;

- hover states.

==================================================

20. ANIMATIONS

==================================================

Ajouter des animations professionnelles mais discrètes :

- fade-in des pages ;

- apparition progressive des KPI ;

- compteur animé ;

- transitions de graphiques ;

- hover cards ;

- hover lignes de tables ;

- transitions sidebar ;

- micro-animation sur les boutons ;

- progression animée de l’agent IA ;

- skeleton loading très court avant affichage de certaines listes ;

- toast notifications ;

- transitions des modals.

Éviter :

- effets trop flashy ;

- animations excessives ;

- couleurs neon ;

- design gaming.

==================================================

21. RESPONSIVE

==================================================

Optimiser principalement pour desktop.

Prévoir aussi tablette.

Desktop :

sidebar fixe + zone principale.

Les grandes tables peuvent avoir scroll horizontal sur petit écran.

==================================================

22. CONTRAINTE TECHNIQUE ABSOLUE

==================================================

FRONT-END UNIQUEMENT.

AUCUNE API.

AUCUN BACKEND.

AUCUNE BASE DE DONNÉES.

AUCUNE AUTHENTIFICATION RÉELLE.

AUCUNE INTÉGRATION AVEC UN SERVICE TIERS.

AUCUN SCRAPING.

AUCUNE CONNEXION LINKEDIN.

AUCUNE CONNEXION WHATSAPP.

AUCUN ENVOI EMAIL RÉEL.

Toutes les fonctionnalités doivent être simulées localement grâce à la mock data.

Les boutons doivent cependant produire des actions visuelles réalistes.

Exemple :

"Lancer la recherche IA"

→ animation

→ faux résultats

"Générer un email"

→ contenu mock généré

"Archiver"

→ modification locale du statut

"Ajouter une note"

→ nouvelle note visible

"Exporter"

→ notification de succès ou téléchargement fictif si possible.

==================================================

23. OBJECTIF FINAL DU MVP

==================================================

Le MVP doit donner l’impression d’un véritable produit SaaS déjà avancé.

Lors d’une démonstration au client, je dois pouvoir raconter ce scénario :

1. Je consulte les opportunités détectées par l’agent.

2. Je lance une nouvelle prospection.

3. Je définis pays, secteur, taille et type d’événement.

4. L’agent simule une recherche.

5. Il identifie et score les opportunités.

6. Je filtre les opportunités.

7. J’ouvre une entreprise.

8. Je comprends pourquoi elle a été sélectionnée.

9. Je vois les contacts recommandés.

10. Je génère un message commercial.

11. Je change le statut de l’opportunité.

12. Le dashboard reflète l’activité.

Créer une UX cohérente permettant de faire exactement cette démonstration.

Ne pas créer un simple template statique.

Créer un MVP réellement navigable, interactif et démontrable.
ne genere pas tous avec une seul page geante : Pour la démo client, le parcours le plus important à soigner est :

Dashboard → Nouvelle recherche → animation IA → Résultats → Opportunité → Contact → Génération du message → changement de statut.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69795d28-e0f6-4a3b-8dd1-377be8d75669).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

function todoApp() {
    //fonction principale qui gère les données réactives de l'application
    return {
        taches: [],
        recherche: '', // Variable pour la recherche par titre
        hovered: null, // Pour l'effet hover des cartes
        //à l'initialisation, charger les données depuis localStorage
        init() {
            const sauvegarde = localStorage.getItem('mesTaches');
            this.taches = sauvegarde ? JSON.parse(sauvegarde) : [];

            //listener pour sauvegarder automatiquement quand les données changent
            this.$watch('taches', valeur => {
                localStorage.setItem('mesTaches', JSON.stringify(valeur));
            });
        },

        //récuperer les tâches filtrées par statut ET par recherche
        getTachesParStatut(statut) {
            return this.taches.filter(t => 
                t.statut === statut &&
                t.title.toLowerCase().includes(this.recherche.toLowerCase())
            );
        },
        //ajouter une nouvelle tâche
        ajouterTache(titre, description) {
            if (titre.trim() === '') return; //ignorer les titre vides
            
            this.taches.push({
                id: Date.now(),
                title: titre,
                desc: description,
                statut: 'a faire', //statut par défaut
                dateCreation: new Date().toLocaleDateString('fr-FR')
            });
        },

        //supprimer une tâche avec confirmation
        supprimerTache(id) {
            if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
                return; //annuler si lutilisateur refuse
            }

            this.taches = this.taches.filter(t => t.id !== id);
        },

        //modifier une tache existante
        modifierTache(id, nouveauxDetails) {
            const index = this.taches.findIndex(t => t.id === id);
            if (index !== -1) {
                //fusionner les donnees anciennes et nouvelles
                this.taches[index] = { 
                    ...this.taches[index], 
                    ...nouveauxDetails,
                    dateModification: new Date().toLocaleDateString('fr-FR')
                };
                this.taches = [...this.taches];
            }
        }
    }
}

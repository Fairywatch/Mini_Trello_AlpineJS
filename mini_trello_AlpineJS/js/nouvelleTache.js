// Gestionnaire du formulaire pour ajouter et modifier les tâches
window.formHandler = function() {
    return {
        show: false, // Affichage du formulaire (modal)
        modifId: null, // ID de la tâche en modification (null = création)
        formData: { 
            title: '', 
            desc: '', 
            statut: 'a faire'
        },

        // Pré-remplir le formulaire quand on le ouvre pour modification
        ouvrirPourModification(tache) {
            this.modifId = tache.id;
            this.formData.title = tache.title;
            this.formData.desc = tache.desc;
            this.formData.statut = tache.statut;
            this.show = true;
        },

        // Soumettre le formulaire
        submitForm() {
            if (!this.formData.title.trim() || !this.formData.desc.trim()) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            if (this.modifId) {
                // Modification d'une tâche existante
                this.$dispatch('tache-modifiee', {
                    id: this.modifId,
                    details: {
                        title: this.formData.title,
                        desc: this.formData.desc,
                        statut: this.formData.statut
                    }
                });
            } else {
                // Création d'une nouvelle tâche
                this.$dispatch('tache-ajoutee', {
                    titre: this.formData.title,
                    description: this.formData.desc
                });
            }
            
            this.reset();
        },

        // Réinitialiser le formulaire
        reset() {
            this.show = false;
            this.modifId = null;
            this.formData = { title: '', desc: '', statut: 'a faire' };
        }
    }
}

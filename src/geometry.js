function make_rectangle(x0,y0,w,h)
{
  return [createVector(x0,y0), createVector(x0+w,y0), createVector(x0+w,y0+h), createVector(x0,y0+h)];
}

// Fonction pour calculer l'enveloppe convexe d'un nuage de points
function convexHull(points) {
    // Trier les points par coordonnées x, puis y en cas d'égalité
    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    // Fonction pour vérifier le sens du tour (produit vectoriel)
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

    const lower = [];
    for (let point of points) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
            lower.pop();
        }
        lower.push(point);
    }

    const upper = [];
    for (let i = points.length - 1; i >= 0; i--) {
        const point = points[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
            upper.pop();
        }
        upper.push(point);
    }

    // Retirer le dernier point de chaque liste car il est dupliqué
    upper.pop();
    lower.pop();

    // Combiner les deux moitiés pour obtenir l'enveloppe convexe
    return lower.concat(upper);
}